import React, { useState } from "react";
import { Button, FormControl, Form, Col } from "react-bootstrap";
import _ from "lodash";

export const Setup = ({ fighterLength, startGame }) => {
  const [maxBattles, setMaxBattles] = useState(1);
  const [name1, setName1] = useState("p1");
  const [name2, setName2] = useState("p2");
  const [mercy, setmercy] = useState(false);
  const absoluteMax = Math.floor(fighterLength / 2);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form id="setup">
        <Form.Group>
          <Form.Label>How Many Battles?</Form.Label>
          <FormControl
            as="select"
            size="10"
            value={maxBattles}
            onChange={e => setMaxBattles(e.target.value)}
          >
            {_.range(1, absoluteMax + 1).map((val, i) => (
              <option value={val} key={i}>
                {val}
              </option>
            ))}
          </FormControl>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>P1's name</Form.Label>
            <FormControl
              value={name1}
              onChange={e => setName1(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>P2's name</Form.Label>
            <FormControl
              value={name2}
              onChange={e => setName2(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Mercy Rule?"
            value={mercy}
            onChange={() => setmercy(!mercy)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => startGame(maxBattles, name1, name2, mercy)}
        >
          Continue
        </Button>
      </Form>
    </div>
  );
};
