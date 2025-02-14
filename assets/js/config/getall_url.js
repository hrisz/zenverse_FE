// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get("gameId");

const gameId = localStorage.getItem("selectedGameId");


if (!gameId) {
    Swal.fire({
      icon: "warning",
      title: "Game unavailable!",
      text: "The game you're looking for has been deleted or not available.",
      timer: 2000,
    });
    setTimeout(() => {
        window.location.href = "main.html";
    }, 2000);
} else if (!/^[a-fA-F0-9]{24}$/.test(gameId)) {
    Swal.fire({
        icon: "warning",
        title: "Game unavailable!",
        text: "The game is not available, ",
        timer: 2000,
      });
      setTimeout(() => {
          window.location.href = "main.html";
      }, 2000);
} else {
    // If valid, construct the API URL
    var urlFetch = "https://zenversegames-ba223a40f69e.herokuapp.com/games/" + gameId;

    fetch(urlFetch, {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Game Not Available",
              text: "There was an issue fetching the game details. Please try again later.",
              customClass: {
                container: 'backdrop-blur-md',
             },
             timer: 2000,
            });
            setTimeout(() => {
                window.location.href = "main.html";
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
    });
}

export { urlFetch };