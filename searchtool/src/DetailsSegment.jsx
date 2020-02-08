import React from "react";
import { Divider, Grid, Header, Image, Label, Modal } from "semantic-ui-react";
import _ from "lodash";

import styles from "./Styles";
const { StyledButton, StyledSegment, StyledP } = styles;

function DetailsSegment({ data = {}, close }) {
  return (
    <StyledSegment color="red">
      <Header as="h2" content={data.title} />
      <Divider />
      <Modal.Content>
        {!_.isEmpty(data) && (
          <Grid columns={3}>
            {[
              "department",
              "culture",
              "origin",
              "date",
              "dimensions",
              "creditLine",
              "medium",
              "location"
            ].map(title => {
              return (
                data[title] && (
                  <Grid.Column key={title}>
                    <Header as="h3">{_.startCase(title)}:</Header>
                    <StyledP>{data[title]}</StyledP>
                  </Grid.Column>
                )
              );
            })}
            {!_.isEmpty(data.tags) && (
              <Grid.Column>
                <Header as="h3">Tags:</Header>
                {data.tags.map(tag => (
                  <Label key={tag} color="red" content={tag} />
                ))}
              </Grid.Column>
            )}
          </Grid>
        )}

        <Grid columns={4}>
          {data.images.map(image => {
            return (
              <Grid.Column key={image}>
                <Image src={image} size="small" />
              </Grid.Column>
            );
          })}
        </Grid>
        <Divider />
      </Modal.Content>
      <Modal.Actions>
        <Grid>
          <Grid.Column textAlign="right">
            <StyledButton onClick={() => close()} basic color="red" compact>
              Close
            </StyledButton>
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </StyledSegment>
  );
}

export default DetailsSegment;
