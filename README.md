# Tic Tac Toe

This is a tic-tac-toe game project built by Sparrow Rubin at General Assembly's
Web Development Immersive.

The deployed version is [here](https://sparrowr.github.io/s_r-tic-tac-toe/).

## Structure

JavaScript files are all in [`assets/scripts`](assets/scripts). The "manifest"
or entry-point is [`assets/scripts/index.js`](assets/scripts/index.js). That
file invokes [`assets/scripts/events.js`](assets/scripts/events.js), which
contains event listeners for the two buttons visible on the screen when the app
is accessed.

Specifically, the authentication content is handled in [`assets/scripts/auth`],
primarily in [`assets/scripts/auth/logic.js`], and the game content is handled
in [`assets/scripts/game`], primarily in [`assets/scripts/game/logic.js`].

`apiUrls.production` and `apiUrls.development` are configured in
[`config/environment.js`](config/environment.js).

Styles are stored in [`assets/styles`](assets/styles) and loaded
from [`assets/styles/index.scss`](assets/styles/index.scss). Bootstrap version 3 is
included in this template.

[getFormFields](get-form-fields.md) is used to retrieve form data to send to an
API.

To deploy a browser-template based SPA with this project, run `grunt deploy`.

## Additional Resources

- [Modern Javascript Explained for Dinosaurs](https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70)
- [Making Sense of Front End Build Tools](https://medium.freecodecamp.org/making-sense-of-front-end-build-tools-3a1b3a87043b)

## Credits

- This was derived from the [GA template](https://git.generalassemb.ly/ga-wdi-boston/browser-template)
- It was designed based on [this list of requirements](https://git.generalassemb.ly/ga-wdi-boston/game-project/blob/master/requirements.md)
- This project relies upon [this API](https://git.generalassemb.ly/ga-wdi-boston/game-project-api)
- Colors were chosen with [this contrast checker](https://webaim.org/resources/contrastchecker/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
