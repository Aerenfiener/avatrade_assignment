## Avatrade Frontend Home Assignment

### Prepare

Check version of yarn ^4.1.1

Install dependencies

```bash
yarn
```

### Deploy

- dev server on localhost

```bash
yarn dev
```

### Task

Create a Vue App (can be 2/3, doesn’t matter) + TypeScript.

The app should have 2 views:
- Login
- Deposit

Create a login page that has a username/password field and creates a fake api call to authenticate the user and keep them logged in, even after refresh or browser close.

Deposit requires an authenticated user, and its route is guarded and would have a form that has Credit card, CVV, and expired fields.

Upon blur and submit events they will be validated. The submit just needs to print the values to the console.

Notes:

The validations shouldn’t be complex, only do ‘this field is required’ type of validations.

Please re-use components and logic as much as possible where needed to prevent duplicate code.
Use modern JS/TS syntax and write modular and organized code.


- Don’t use any 3rd party libraries, except for Vue and vanilla JS/TS.
- Store authentication data in Vuex store and use it from there.


Follow the attached Figma for the Signup page and use the same design structure for the Deposit page.



Good luck!



Figma - https://www.figma.com/file/OTCKBgLwRTJZ3Qo8XbW1zY/Untitled?type=design&node-id=0%3A1&mode=design&t=AKfFO71ZMaNx1EP2-1