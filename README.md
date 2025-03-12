# CS476 Project: Chef's Code

## Project Description
  1. **Application Domain**: Cooking/Cuisine
  2. **Motivation**: We aim to provide users with a quick and efficient way to utilize their food by offering recipes based on available ingredients. Users can input a list of ingredients into the website and receive recipe suggestions that match. This feature is especially useful for turning leftover ingredients into a complete dish.

## User Role Description
**Recipe Seeker (End Users)**
The recipe seekers are the individuals who use our website to look for recipe options based on the ingredients they have. To do so, users need to type in the ingredients they currently have on hand. Then based on the ingredients the user entered, they will receive recipe recommendations they can make with the ingredients they have.

**Account Admin (Admin Role)**
This role has the ability to moderate other users by deleting user accounts. This is to stop users from displaying inappropriate behaviors on the website.

## Functional Requirement
1. **User Interaction:**
  - Users input a list of available ingredients.
2. **Recipe Search and Recommendation:**
  - Compare input ingredients with a recipe database to suggest recipes.
  - Provide detailed instructions, quantities, and durations.
  - Suggest recipes even when some ingredients are missing.
3. **User Preferences:**
  - Support dietary preferences (e.g., vegetarian, gluten-free, etc.).
  - Support cuisine preferences (e.g., Italian, Mexican, etc.).
4. **Authentication and Profiles:**
  - Allow users to create profiles for saving recipes.

## Quality Requirement
1. **Recipe Seeker:**
  - **Robustness:** Handle incomplete ingredient lists or minor errors (e.g., misspellings). The system should autocorrect and suggest corrections while supporting a wide range of common and uncommon ingredients.
  - **Correctness:** Ensure recipe suggestions accurately match the inputted ingredients. Substitutions, cooking times, and serving sizes must be correctly displayed.
  - **Time-Efficiency:** Provide results within a few seconds of input.

2. **Account Admin:**
  - **Robustness:** When searching for a non-existant user, the search engine will provide an appropriate error message. 
  - **Correctness:** When the admin selects a user to delete from the GUI, the same user will be deleted from the database.
  - **Time-Efficiency:** Deletion happens in real-time.