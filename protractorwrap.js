// The file contains the reusable functions required to the test application.

var fs = require('fs');
var request = require('request');
var pWrap = function() {
    // Different methods required to locate an element.
    this.LOCATE_BY = {
        ID: 'id',
        NAME: 'name',
        XPATH: 'xpath',
        MODEL: 'model',
        BIND: 'bind',
        STYLE: 'css',
        REPEATER: 'repeater'
    };

    /* The function clicks on an element on the UI.
       [input]:
          locator: the element to be clicked.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
       [output]:
          Clicks the element.
    */
    this.clickElement = function(locator, locate_by) {
        switch (locate_by) {
            case 'id':
                this.highlightElement(element(by.id(locator)));
                element(by.id(locator)).click();
                break;

            case 'name':
                this.highlightElement(element(by.name(locator)));
                element(by.name(locator)).click();
                break;

            case 'model':
                this.highlightElement(element(by.model(locator)));
                element(by.model(locator)).click();
                break;

            case 'bind':
                this.highlightElement(element(by.binding(locator)));
                element(by.binding(locator)).click();
                break;

            case 'css':
                this.highlightElement(element(by.css(locator)));
                element(by.css(locator)).click();
                break;

            case 'xpath':
                this.highlightElement(element(by.xpath(locator)));
                element(by.xpath(locator)).click();
                break;

            default:
                return null;
        }
    };

    /* The function returns the reference of an element.
       [input]:
          locator: the element to get reference of.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
       [output]:
          Returns the reference of an element.
    */
    this.getElement = function(locator, locate_by) {
        switch (locate_by) {
            case 'id':
                this.highlightElement(element(by.id(locator)));
                return element(by.id(locator));

            case 'name':
                this.highlightElement(element(by.name(locator)));
                return element(by.name(locator)).click();

            case 'model':
                this.highlightElement(element(by.model(locator)));
                return element(by.model(locator));

            case 'bind':
                this.highlightElement(element(by.binding(locator)));
                return element(by.binding(locator));

            case 'css':
                this.highlightElement(element(by.css(locator)));
                return element(by.css(locator));

            case 'xpath':
                this.highlightElement(element(by.xpath(locator)));
                return element(by.xpath(locator));

            case 'repeater':
                this.highlightElement(element(by.repeater(locator)));
                return element(by.repeater(locator));

            default:
                return null;
        }
    };

    /* The function returns the reference of all the elements.
       [input]:
          locator: the element to get reference of.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
       [output]:
          Returns the reference of all the element. That is it returns a list.
    */
    this.getAllElements = function(locator, locate_by) {
        switch (locate_by) {
            case 'css':
                return element.all(by.css(locator));

            case 'xpath':
                return element.all(by.xpath(locator));

            case 'repeater':
                return element.all(by.repeater(locator));

            default:
                return null;
        }
    };

    /* The function waits until the element is present in the DOM page.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
          wait_period: the wait period (time in milli seconds) to check the presence of the element.
    */
    this.waitForPresenceOfElement = function(locator, locate_by, wait_period) {
        browser.wait(protractor.ExpectedConditions.presenceOf(this.getElement(locator, locate_by)), wait_period);
    };

    /* The function reads json file and returns the json content which is actually in the file.
       [input]:
          file_name: the json file to read the application url.
       [output]:
          Contents of the read file.
    */
    this.getUrlFile = function(file_name) {
        return JSON.parse(fs.readFileSync(file_name, 'utf8'));
    };

    /* The function gets the current url of the page.
       [output]:
          Returns a promise, which is actually the current url of the page.
    */
    this.getUrl = function() {
        return browser.getCurrentUrl().then(function(url) {
            return url;
        });
    };

    /* The function verifies if the url is changed. That is, it verifies the current url of the page is not equal to url supplied by the user.
       [input]:
          url: url to verify.
       [output]:
          Returns true if current url of page does not match with user supplied url.
    */
    this.isUrlChanged = function(url) {
        return browser.getCurrentUrl().then(function(current_url) {
            return current_url != url;
        });
    };

    /* The function enters the text in a textbox.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
          input_data: text to be entered in the textbox.
    */
    this.enterInputInTextBox = function(locator, locate_by, input_data) {
        this.getElement(locator, locate_by).sendKeys(input_data)
    };

    // The function waits until angular has finished rendering and has no outstanding $http or $timeout calls before continuing.
    this.waitForAngular = function() {
        browser.waitForAngular();
    }

    /* The function gets the text of the element.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
       [output]:
          Returns the text of the element.
    */
    this.getText = function(locator, locate_by) {
        value = this.getElement(locator, locate_by).getText().then(function(text) {
            return text;
        })
        return value;
    };

    /* The function asserts the actual and expected values are same.
       [input]:
          actual: actual value.
          expected: expected value.
    */
    this.assertEquals = function(actual, expected) {
        expect(actual).toEqual(expected);
    };

    /* The function verifies if the element is currently displayed on the page.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
    */
    this.verifyElementIsDisplayed = function(locator, locate_by) {
        expect(this.getElement(locator, locate_by).isDisplayed()).toBe(true);
    };

    /* The function verifies if the element is not currently displayed on the page.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
    */
    this.verifyElementIsNotDisplayed = function(locator, locate_by) {
        expect(this.getElement(locator, locate_by).isDisplayed()).toBe(false);
    };

    /* The function verifies if the element is not present on the page.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
    */
    this.verifyElementIsNotPresent = function(locator, locate_by) {
        expect(this.getElement(locator, locate_by).isPresent()).toBe(false);
    };

    /* The function navigates to the destined page.
       [input]:
          url: destination page url- url to navigate to.
    */
    this.navigateToPage = function(url) {
        browser.get(url);
        this.waitForAngular();
    };

    /* The function gets the content of the key from the json file.
       [input]:
          file: the json file from which the value of key needs to be fetched.
          key: key for which value needs to be fetched.
       [output]:
          Returns the value of the key or error if the key is not found or file is null.
    */
    this.readFileWithKey = function(file, key) {
        if (file == null) {
            throw "File is not provided."
        } else if (!file.hasOwnProperty(key)) {
            throw "Key: " + key + " not present in the file: " + file
        } else {
            return file[key];
        }
    };

    /* The function highlights each element on the page the user request's for.
       [input]:
          el: element that needs to be highlighted.
       [ouput]:
          Returns the highlighted reference of the element.
    */
    this.highlightElement = function(el) {
        return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "color: Red; border: 2px solid red;").
        then(function(resp) {
            browser.sleep(50);
            return el;
        }, function(err) {
            console.log("error is :" + err);
        });
    };

    /* The function checks that an element present on the DOM of a page, is visible and is displayed.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
          wait_period: the wait period (time in milli seconds) to check the presence of the element.
    */
    this.waitForElementVisibility = function(locator, locate_by, wait_period) {
        browser.wait(protractor.ExpectedConditions.visibilityOf(this.getElement(locator, locate_by)), wait_period);
        expect((this.getElement(locator, locate_by)).isDisplayed()).toBeTruthy();
    };

    /* The function causes driver to sleep for the given amount of time.
       [input]:
          sleep_time: time in milli seconds.
    */
    this.sleep = function(sleep_time) {
        browser.sleep(sleep_time);
    };

    /* The function bypasses the auth0 browser specific authentication prompt by generating the auth0 token
        and setting the token along with user credentials as cookies to the browser for the requested application url.
        [input]:
           client_id: client_id.
           user_name_to_generate_auth0: username for auth0 token generation.
           password_to_generate_auth0: password for auth0 token generation.
           connection: the account resgistered with auth0.
           profile: is an json object. That is userName and userEmailId.
           profile = {
              username: username,
              email: userEmailId
           }
           application_url: application url for which cookies needs to be set.
    */
    this.bypassBrowserSpecificAuthenticationPopup = function(auth0_uri, client_id, user_name_to_generate_auth0, password_to_generate_auth0, connection, profile, application_url) {
        var defer = protractor.promise.defer();
        var credentials = {
            "client_id": client_id,
            "username": user_name_to_generate_auth0,
            "password": password_to_generate_auth0,
            "id_token": "",
            "connection": connection,
            "grant_type": "password",
            "scope": "openid scopes",
            "device": "api"
        }
        request({
            url: auth0_uri,
            method: 'POST',
            json: true,
            body: credentials,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(error, response, body) {
            if (error) {
                defer.reject(error);
            } else {
                auth_token_id = body.id_token;
                // Fetch the domain from the supplied url for setting the cookies.
                var domain = application_url.split("//");
                browser.manage().addCookie("profile", JSON.stringify(profile), '/', domain[1]);
                browser.manage().addCookie("id_token", auth_token_id, '/', domain[1]);
                defer.fulfill(body);
            }
        });
        return defer.promise;  
    };

    /* The function gets the cookie stored in the browser.
       [input]:
          cookie_name: name of cookie to be retrieved.
        [output]:
           Returns a promise.
    */
    this.getCookie = function(cookie_name) {
        var deferred = protractor.promise.defer();
        browser.manage().getCookie(cookie_name).then(function(cookie) {
            deferred.fulfill(cookie.value);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    /* The function gets the currentl url of the page and compares it with the expected_url supplied by the user.
       [input]:
          expected_url: expected url.
    */
    this.compareCurrentUrl = function(expected_url) {
        expect(browser.getCurrentUrl()).toEqual(expected_url);
    };

    // The function refresh's the current page.
    this.refreshPage = function() {
        browser.refresh();
    }

    // The function deletes all the cookies from the browser.
    this.deleteAllCookiesFromBrowser = function() {
        browser.manage().deleteAllCookies();
    };

    /* The function verifies if the element is clickable.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
          wait_period: the wait period (time in milli seconds) to check the presence of the element.
    */
    this.verfiyElementIsClickable = function(locator, locate_by, wait_period) {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.getElement(locator, locate_by)), wait_period);
    };

    /* The function gets the value of the attribute.
       [input]:
          locator: locator of the element.
          locate_by: by which the locator needs to be located.
          attribute_name: the attribute name whose value needs to be fetched.
       [output]:
          The value of the attribute.
    */
    this.getAttributeValue = function(locator, locate_by, attribute_name) {
        attribValue = this.getElement(locator, locate_by).getAttribute(attribute_name).then(function(value) {
            return value;
        });
        return attribValue;
    };

    /* The function asserts the actual value and expected result are not the same.
       [input]:
          actual: actual value.
          expected: expected value.
    */
    this.assertNotEquals = function(actual, expected) {
        expect(actual).not.toEqual(expected);
    };

    /* The function checks if the checkbox is selected. If so, it unchecks the checkbox.
       [input]:
          locator: the element to get reference of.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
    */
    this.uncheckCheckBox = function(locator, locate_by) {
        holder = this.getElement(locator, locate_by);
        holder.isSelected().then(function(selected) {
            if (selected) {
                holder.click();
            }
        });
    };

    /* The function checks whether the textbox is disabled.
       [input]:
          locator: the element to get reference of.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
    */
    this.verifyTextBoxIsDisabled = function(locator, locate_by) {
        expect((this.getElement(locator, locate_by)).isEnabled()).toBe(false);
    };

    /* The function switches to a new tab on the browser.
       [input]:
          child_tab_number: tab to which the control should navigate to.
    */
    this.switchToChildTab = function(child_tab_number) {
        browser.getAllWindowHandles()
            .then(function(handles) {
                return browser.switchTo().window(handles[child_tab_number]);
            })
    };

    /* The function is used when the control is on the new tab and we want the control to return to the original tab.
       The parent tab always starts from 0 and the remaining tab numbers so on.
       [input]:
          child_tab_number: tab on which the control is presently on.
          parent_tab_number: the parent tab where the control should get back to.
    */
    this.switchToParentTab = function(child_tab_number, parent_tab_number) {
        browser.getAllWindowHandles()
            .then(function(handles) {
                browser.switchTo().window(handles[child_tab_number]);
                browser.driver.close();
                browser.switchTo().window(handles[parent_tab_number]);
            })
    };

    /* The function verifies that the element is not present on the page.
       [input]:
          locator: the element to get reference of.
          locate_by: locate an element by one of the options defined in LOCATE_BY json object.
    */
    this.verifyElementIsNotPresent = function(locator, locate_by) {
        expect(this.getElement(locator, locate_by).isPresent()).toBe(false);
    };

    // The function clicks the browsers back button.
    this.clickBrowserBackButton = function() {
        browser.navigate().back();
    };

    /* The function sets the cookie in the browser.
       [input]:
      	  key: the cookie key.
      	  value: the value to be stored in the cookie.
    */
    this.setCookieValue = function(key, value) {
        browser.manage().addCookie(key, value);
    };

    /* The function gets the value of the cookie stored in browser.
       [input]:
          cookie_name: the name or the key of the cookie whose value needs to be fetched.
    */
    this.getCookieValue = function(cookie_name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + cookie_name + "=");
        if (parts.length >= 2)
            return parts.pop().split(";").shift();
    };

};
module.exports = new pWrap();
