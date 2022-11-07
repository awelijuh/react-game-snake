import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import {BLOCK_SIZE, FIELD_SIZE} from "../utils/Const";
import {createEmptyField, createFieldWithSnake} from "../utils/Utils";

function getAnimation(prev, curr) {
    if (prev.y < curr.y) {
        return 'left-to-right'
    }
    if (prev.y > curr.y) {
        return 'right-to-left'
    }
    if (prev.x < curr.x) {
        return 'top-to-bottom'
    }
    if (prev.x > curr.x) {
        return 'bottom-to-top'
    }
}

function FieldItem({isBody, isHead, isTail, isPoint, speed, animationClass}) {

    let time = 1200 / speed;

    return (
        <div style={{width: BLOCK_SIZE, height: BLOCK_SIZE}}
             className={`d-inline-block p-0 m-0 ${(isBody || isHead) && "bg-success"} ${isPoint && "bg-warning"}`}>
            {
                isHead &&
                <div className={"bg-black w-100 h-100"}
                     style={{position: 'relative', animation: `${animationClass} ${time}ms`}}/>
            }
            {
                isTail &&
                <div className={"bg-success w-100 h-100"}
                     style={{position: 'relative', animation: `${animationClass} ${time}ms`}}/>
            }
        </div>
    )
}


export default function Field({snake, point, speed}) {

    const [field, setField] = useState(createEmptyField())

    useEffect(() => {
        setField(createFieldWithSnake(snake, point))
    }, [snake])

    return (
        <div className="border">

            {
                field.map((row, i) =>
                    <Row className="m-0">
                        {
                            row.map((col, j) =>
                                <FieldItem key={`key_${i}_${j}_${col}`} isBody={col === 1} isHead={col === 2}
                                           isPoint={col === 3} speed={speed} isTail={col === 4}
                                           animationClass={col === 2 ? getAnimation(snake.at(-2), snake.at(-1)) : col === 4 ? getAnimation(snake[0], snake[1]) : ""}
                                />
                            )
                        }
                    </Row>
                )
            }

        </div>
    )

}
