import React from "react";
import { Row, Col } from "react-bootstrap";

const width = 100;
const height = 100;

function createEmptyField() {
    let field = []

    for (let i = 0; i < height; i++) {
        field.push([])
        for (let j = 0; j < width; j++) {
            field[i].push(0)
        }
    }
    return field
}


function FieldItem(props) {

    return (
        <div style={{ width: 10, height: 10 }} className="border d-inline-block">
            <div className="d-flex h-100">
                <div className="m-auto" style={{ fontSize: '25px' }}>{value !== -1 ? value : ''}</div>
            </div>
        </div>
    )
}


export default function Field(props) {

    const field = createEmptyField()

    return (
        <div>
            {
                field.map(row =>
                    <Row>
                        {
                            row.map(col =>
                                <FieldItem />
                            )
                        }
                    </Row>
                )
            }
        </div>
    )

}