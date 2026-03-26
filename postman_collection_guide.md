# Guide: Importing and Using the Postman Collection

## Importing the Collection and Environment

![Step 1 and 2](/postman/screenshots/1-2.png)

1. On the left sidebar, click the three-dot icon `...` in the top right corner of the Collections tab.
2. Select **Import**.

![Step 3](/postman/screenshots/3.png)

3. In the import window, click on **files** to select files from your computer.

![Step 4](/postman/screenshots/4.png)

4. Select the Postman Collection and Environment files (`.json` extension) you want to import, then click **Open**.

![Step 5 and 6](/postman/screenshots/5-6.png)

5. In the Import Elements window, verify the details and ensure the checkmarks `✓` are selected for both the Collection and Environment.
6. Click the orange **Import** button in the bottom right corner to import the data into your Workspace.

---

## Selecting the Environment

![Step 7](/postman/screenshots/7.png)

7. After the import is complete, you will see **PokeAPI Backend** under the COLLECTIONS section and **PokeAPI Local** under the ENVIRONMENTS section on the left sidebar.

![Step 8 and 9](/postman/screenshots/8-9.png)

8. Before sending an API request, go to the top right corner of the screen (the Environment dropdown menu) to set up the environment.
9. Select **PokeAPI Local** from the dropdown so the system can correctly use the configured variables.

---

## Sending a Request

![Step 10 and 11](/postman/screenshots/10-11.png)

10. Open the Request you want to test from the Collection (e.g., `Get Random Pokemon`), then click the blue **Send** button on the right.
11. Wait for the result. The server's response data will be displayed in the Body tab at the bottom (for example, Pokémon data in JSON format).