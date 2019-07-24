import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Button,
  MobileStepper,
  TextField,
  Divider,
  Typography,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import "./AddSkill.scss";
import ChooseAType from "./ChooseAType";
import ChooseAPurpose from "./ChooseAPurpose";
import Context from "../Context";
import { Close } from "@material-ui/icons";
import Spacer from "../Spacer";
import { apiUrl } from "../../utils/data";

export default function AddSkill({ onClose, item }) {
  const { user, setUser } = useContext(Context);
  const [activeStep, setActiveStep] = useState(0);
  const inputRef = useRef(null);
  const [skill, setSKill] = useState({
    name: "",
    need: 0,
    type: "skill", // skill, item
    description: "",
    img: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if item is passed, we go edit mode
    if (item) {
      setSKill(item);
      setActiveStep(2);
    }
  }, []);

  function handleMoveStep(step) {
    setActiveStep(step);
  }

  function updateSkill(attr, value) {
    setSKill({ ...skill, [attr]: value });
  }

  // if submitting
  function handleNextClick() {
    const { img, ...skillProps } = skill;

    if (activeStep === 2) {
      const newUser = { ...user };
      setLoading(true);
      // add if no ID otherwise edit
      if (!skill.id) {
        const fd = new FormData();
        if (skill.img.length > 0) {
          // each slot seems to be convert to array
          skill.img.forEach(i => fd.append("images", i.file));
        }
        fd.append(
          "body",
          JSON.stringify({
            ...skillProps,
            profileName: user.name,
            profileId: user.id,
            profilePic: user.img,
            location: `${user.country}, ${user.city}`
          })
        );

        fetch(`${apiUrl}/listing`, {
          method: "POST",
          body: fd
        })
          .then(res => res.json())
          .then(({ insertId, imageUrls }) => {
            const newSkill = { ...skill, id: insertId, img: imageUrls ? imageUrls : [] };
            newUser.listings.push(newSkill);
            setLoading(false);
            setUser(newUser);
            onClose();
          });
      } else {
        const body = {
          ...skill,
          profileName: user.name,
          profileId: user.id,
          profilePic: user.img
        };
        console.log("sender den her", body);
        fetch(`${apiUrl}/listing/${skill.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(res => {
          console.log("Upload success");
          const index = newUser.listings.findIndex(listing => listing.id === skill.id);
          newUser.listings[index] = skill;
          setUser(newUser);
          setLoading(false);
          onClose();
        });
      }
    } else {
      handleMoveStep(activeStep + 1);
    }
  }

  function handleDelete() {
    console.log(skill.id);
    fetch(`${apiUrl}/listing/${skill.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(result => {
        const newUser = { ...user };
        const index = newUser.listings.findIndex(listing => listing.id === skill.id);
        newUser.listings.splice(index, 1);
        setUser(newUser);
        onClose();
      });
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const fr = new FileReader();
      fr.addEventListener("load", function() {
        setSKill({ ...skill, img: [...skill.img, { preview: fr.result, file }] });
      });
      fr.readAsDataURL(file);
    }
  }

  function handleRemoveImg(index) {
    const newSkill = { ...skill };
    newSkill.img.splice(index, 1);
    setSKill(newSkill);
  }

  function getStep() {
    switch (activeStep) {
      case 0:
        return <ChooseAPurpose onChange={updateSkill} value={skill.need} />;
      case 1:
        return <ChooseAType onChange={updateSkill} value={skill.type} />;
      case 2:
        return (
          <div>
            <div className="container">
              <TextField
                label="Title"
                value={skill.name}
                margin="dense"
                onChange={e => updateSkill("name", e.target.value)}
              />
              <TextField
                label="Description"
                value={skill.description}
                margin="dense"
                multiline
                rows="3"
                onChange={e => updateSkill("description", e.target.value)}
              />
            </div>
            <Divider />
            <div className="container">
              <div className="actions-container">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => inputRef.current.click()}
                  disabled={loading || skill.id}
                >
                  Upload
                </Button>
                {skill.id && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Delete listing
                  </Button>
                )}
              </div>
              <Spacer />
              {skill.img.length === 0 ? (
                <Typography variant="body1">No images uploaded yet</Typography>
              ) : (
                <div className="img-container">
                  {skill.img.map((i, index) => (
                    <div className="img-entry" key={`img_${index}`}>
                      {!skill.id ? (
                        <>
                          <div>
                            <img src={i.preview} alt="" />
                          </div>
                          <IconButton onClick={() => handleRemoveImg(index)} disabled={loading}>
                            <Close />
                          </IconButton>
                        </>
                      ) : (
                        <img src={i} alt="" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="file" ref={inputRef} onChange={handleUpload} />
            {loading ? (
              <div className="container">
                <CircularProgress />
              </div>
            ) : null}
          </div>
        );
    }
  }

  return (
    <div className="AddSkill">
      {getStep(activeStep)}
      <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNextClick}
            disabled={(activeStep === 2 && !skill.item && !skill.description) || loading}
          >
            {activeStep !== 2 ? "Next" : "Submit"}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleMoveStep(activeStep - 1)}
            disabled={activeStep === 0 || loading}
          >
            Back
          </Button>
        }
      />
    </div>
  );
}
