function timer() {
  //Timer
  const deadline = new Date("2023-06-08");

  function showDeadline(date) {
    const t = date - new Date();
    let days, hours, minutes, seconds;
    if (t <= 0) {
      days = hours = minutes = seconds = 0;
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / (1000 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(elem) {
    if (elem < 10) {
      return "0" + elem;
    } else {
      return elem;
    }
  }

  function insertTime() {
    const days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      t = setInterval(updateClock, 1000);

    function updateClock() {
      let time = showDeadline(deadline);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);

      if (time.t < 0) {
        clearInterval(t);
      }
    }
    updateClock();
  }

  insertTime();
}

export default timer;
