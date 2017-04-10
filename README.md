# ProtractorWrap
A Nodejs library to simplify the ui test automation for AngularJs application.
It is a wrapper over protractor in-built functions, that helps to structure the ui test automation.

# Installation
```
  npm install protractorwrap
```
# Usage
```javascript
  var pWrap = require('protractorwrap');
```  

1. To **click** an element.
    ```javascript
    Syntax:
       pWrap.clickElement(locator_name, locate_by);

    1. Locate by xpath.
       Example:
          pWrap.clickElement("//a[text()='Contact']", pWrap.LOCATE_BY.XPATH);

    2. Locate by name.
       Example:
          pWrap.clickElement("dog_name", pWrap.LOCATE_BY.NAME);

    so on and so forth with other methods to locate an element and click it.
    ```  

2. To **get** an element.
    ```javascript
    Syntax:
       pWrap.getElement(locator_name, locate_by);

    1. Locate by xpath.
       Example:
         var contactLabel = pWrap.getElement("//a[text()='Contact']", pWrap.LOCATE_BY.XPATH);
         expect(contactLabel.isDisplayed()).toBe(true);

    2. Locate by name.
       Example:
         var dogName = pWrap.getElement("dog_name", pWrap.LOCATE_BY.NAME);
         expect(dogName.isDisplayed()).toBe(false);

    so on and so forth with other methods to locate the element and get it.
    ```  

3. To **input text** in a textbox.
    ```javascript
    Syntax:
      pWrap.enterInputInTextBox(locator, locateBy, inputData);
    Example:
      pWrap.enterInputInTextBox("text_box", pWrap.LOCATE_BY_NAME, "Welcome to Protractor Wrap")
    ```  

4. To **navigate** to a page.
    ```javascript
    Syntax:
      pWrap.navigateToPage(url);
    Example:
      pWrap.navigateToPage("https://cimpress.com/")
    ```  

5. To **get value of a key** from json file.
    ```javascript
    Syntax:
      pWrap.readFileWithKey(file, key);
    ```
    Let us assume you have a config file.
    ```json
    config.json
    {
        "Profile": {
             "nickname": "name",
             "email": "name@domain.com"
         }
    }
    ```
    In your test if you want to read profile object, you can do that as below:
    ```javascript
    Example:
      var config = require('../data/Config.json');                                             
      profile = pWrap.readFileWithKey(config, "Profile");
    ```   

6. To **set cookie**.
    ```javascript
    Syntax:
      pWrap.setCookieValue(key, value);
    Example:
      pWrap.setCookieValue("id_token", tokenValue);
    ```  

7. To check if element is **visible and displayed**.
    ```javascript
    Syntax:
        pWrap.waitForElementVisibility(locator, locateBy);
    Example:
      pWrap.waitForElementVisibility("search.barcodeId", pWrap.LOCATE_BY.MODEL);
    ```  

8. To **get cookie**.
    ```javascript
    Syntax:
      pWrap.getCookie(key);
    Example:
      pWrap.getCookie('id_token').then(function(auth0Token) {
          pWrap.navigateToPage("https://cimpress.com/");
          pWrap.verifyElementIsNotPresent("name", pWrap.LOCATE_BY.NAME);
      }
    ```  

9. To **compare current url**.
    ```javascript
    Syntax:
      pWrap.compareCurrentUrl(expectedUrl);
    Example:
      Let us assume you have navigated to https://cimpress.com/ and you want to verify if the current url and expected url are same.
      pWrap.compareCurrentUrl("https://cimpress.com/");
    ```   

10. If you have use-case where in you have a **browser specific authentication pop-up** and you want to **bypass the pop-up** you can do it as below:

    Let us assume you have the config, service account credentials and application url in different json files.
    ```javascript
      Syntax:
        pWrap.bypassBrowserSpecificAuthenticationPopup(auth0Uri, auth0ClientId, serviceAccountUsername, ServiceAccountPassword, profile, connection, appUrl);
    ```
    ```json
    Config.json
    {
        "Auth0": {
            "comment": "Service to get auth0 token.",
            "uri": "auth0Uri",
            "clientId": "clientId"
        },
        "Profile": {
            "nickname": "name",
            "email": "name@domain.com"
        },
        "Connection": "accountADFS"
    }
    ```
    ```json
    Credentails.json
    {
        "ServiceAccountCredentials": {
            "username": "serviceAccountUserName",
            "password": "serviceAccountPassword"
        }
    }
    ```
    ```json
    ApplicationUrl.json
    {
        "appUrl": "https://domain.com"
    }
    ```

    ```javascript
    var config = require('Config.json');
    var credentials = require('Credentials.json');
    var urlFile = pWrap.getUrlFile('ApplicationUrl.json');
    profile = pWrap.readFileWithKey(config, "Profile");
    auth0 = pWrap.readFileWithKey(config, "Auth0");
    connection = pWrap.readFileWithKey(config, "Connection");
    pWrap.bypassBrowserSpecificAuthenticationPopup(auth0.uri, auth0.clientId, credentials.ServiceAccountCredentials.username, credentials.ServiceAccountCredentials.password, profile, connection, urlFile.appUrl);
    pWrap.navigateToPage(urlFile.appUrl);
    ...
    ...
    ```
    The method is specific to auth0 that is the method generates auth0 and stores the profile and auth0 token in the browser resulting in bypass of authentication pop-up.

11. To **refresh** page.
    ```javascript
    Syntax:
      pWrap.refreshPage();
    Example:
      pWrap.refreshPage();

    If your page takes a long time to load and you want to wait then you combine, refresh with sleep as below:

    pWrap.refreshPage();
    pWrap.sleep(20000);
    ```

# Contributing
We appreciate contributions. Fork the repository and come up with a pull request. Thank you!
We will focus on development of ProtractorWrap and make the UI test automation easy by using a proper structure under a single hood.
