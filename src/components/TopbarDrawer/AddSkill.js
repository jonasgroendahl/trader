import React, { useState, useContext } from "react";
import { Button, MobileStepper, TextField, Divider, Typography } from "@material-ui/core";
import "./AddSkill.scss";
import ChooseAType from "./ChooseAType";
import ChooseAPurpose from "./ChooseAPurpose";
import Context from "../Context";

export default function AddSkill({ onClose }) {
  const { user, setUser } = useContext(Context);
  const [activeStep, setActiveStep] = useState(0);
  const [skill, setSKill] = useState({
    name: "",
    need: 0,
    type: "skill", // skill, item
    description: "",
    img: [],
    rating: 0
  });

  function handleMoveStep(step) {
    setActiveStep(step);
  }

  function updateSkill(attr, value) {
    setSKill({ ...skill, [attr]: value });
  }

  function handleNextClick() {
    if (activeStep === 2) {
      setUser({ ...user, listings: [...user.listings, skill] });
      setTimeout(() => console.log(user), 1000);
      onClose();
    } else {
      handleMoveStep(activeStep + 1);
    }
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
              <Button variant="contained" color="primary">
                Upload
              </Button>
              {skill.img.length === 0 ? (
                <Typography variant="body1">No images uploaded yet</Typography>
              ) : (
                <div>
                  {skill.img.map(i => (
                    <img src={i} />
                  ))}
                </div>
              )}
            </div>
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
            disabled={activeStep === 2 && !skill.item && !skill.description}
          >
            {activeStep !== 2 ? "Next" : "Submit"}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => handleMoveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>
        }
      />
    </div>
  );
}
