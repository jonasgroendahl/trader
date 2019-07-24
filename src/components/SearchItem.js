import React from "react";
import { Card, CardMedia, Grid, Typography } from "@material-ui/core";
import "./SearchItem.scss";
import { Link } from "react-router-dom";

export default function SearchItem({
  name,
  location,
  img = "http://denrakaev.com/wp-content/uploads/2015/03/no-image.png",
  profileName = "",
  id
}) {
  return (
    <Card className="SearchItem" component={Link} to={`/listing/${id}`}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia
            src={
              img.length > 0
                ? img[0]
                : "https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png"
            }
            height={100}
            component="img"
          />
        </Grid>
        <Grid item xs={6}>
          <div className="content">
            <Typography variant="body1">{name}</Typography>
            <Typography variant="caption">{profileName}</Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
