import { useEffect, useState } from "react";

function padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
}

export default function Timer({ state, setState }) {
    const [time, setTime] = useState([0, 0, 0]);

    const handleChange = (position, value, max) => {
        value = parseInt(value.target.value);
        value = isNaN(value) ? "" :
            value > max ? time[position] :
                value;

        let time2 = time.slice();
        time2[position] = value;
        setTime(time2);
    }

    const timerFunction = () => {
        let time2 = time.slice();
        if (!(time[0] === 0 && time[1] === 0 && time[2] === 0)) {
            time2[2]--;
        } else {
            setState(1);
            alert("Time is up!!");
        } if (time2[2] == -1) {
            time2[2] = 59;
            time2[1]--;
        } if (time2[1] == -1) {
            time2[1] = 59;
            time2[0]--;
        }
        setTime(time2);
    }

    const setViewTimer = (state == 1 ?
        <div className="clock">
            <input type="text" value={time[0]} onChange={e => handleChange(0, e, 23)} />
            <input type="text" value={time[1]} onChange={e => handleChange(1, e, 59)} />
            <input type="text" value={time[2]} onChange={e => handleChange(2, e, 59)} />
        </div> : <TimerView time={time} setTimer={timerFunction} />
    );

    return setViewTimer;
}


function TimerView({ time, setTimer }) {
    let idInterval = null;
    useEffect(() => {
        idInterval = setInterval(() => {
            setTimer();
        }, 1000)
        return () => clearInterval(idInterval);
    });
    return (
        <div className="clock">
            <span>{padStartDigit([0])}: </span>
            <span>{padStartDigit(time[1])}: </span>
            <span>{padStartDigit(time[2])}</span>
        </div>
    );
}