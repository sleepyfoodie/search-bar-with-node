import React from "react";
import _ from "lodash";
import { Divider, Grid, Header, Image, Table } from "semantic-ui-react";

import styles from "./Styles";

const { Link, ClickableCell } = styles;

function ResultTable({ selectObject, results }) {
  return (
    <Grid.Row>
      <Grid.Column width={10}>
        <Divider hidden />
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map(result => {
              return (
                <Table.Row key={`${result.title}-${result.id}`}>
                  <ClickableCell onClick={() => selectObject(result.id)}>
                    <Header as="h4" image>
                      <Image src={result.image} rounded size="mini" />
                      <Header.Content>
                        {_.truncate(result.title, { length: 70 })}
                      </Header.Content>
                    </Header>
                  </ClickableCell>
                  <Table.Cell textAlign="right">
                    <Link target="_blank" href={result.link}>
                      View on MET
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid.Row>
  );
}

export default ResultTable;
