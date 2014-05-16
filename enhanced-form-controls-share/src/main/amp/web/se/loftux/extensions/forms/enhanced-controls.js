(function()
{
	/**
	 * Extra namespace functions
	 */
	var $html = Alfresco.util.encodeHTML;

	/**
	 * Loftux top-level constants namespace.
	 *
	 * @namespace Alfresco
	 * @class Loftux.controls
	 */
   if (typeof Loftux == "undefined" || !Loftux)
   {
      Loftux = {};
   }
   Loftux.controls = Loftux.controls || {};

	/**
	 * PeopleAutocomplete constructor.
	 *
	 * @param htmlId
	 *           {String} The HTML id of the parent element
	 * @return {Loftux.component.Avtalsdokument} The new Avtalsdokument instance
	 * @constructor
	 */
	Loftux.controls.PeopleAutocomplete = function(htmlId, currentValueHtmlId)
	{
		Loftux.controls.PeopleAutocomplete.superclass.constructor.call(this, "Loftux.controls.PeopleAutocomplete", htmlId, [ "autocomplete" ]);
		this.currentValueHtmlId = currentValueHtmlId;

		return this;
	};

	/**
	 * Extend from Alfresco.component.Base
	 */
	YAHOO.extend(Loftux.controls.PeopleAutocomplete, Alfresco.component.Base, {
		options : {
			mode : "view",
			currentValue : "",
			mandatory : false
		},
		onReady : function PA_onReady()
		{

			var arrItems = [], arrItemsToFetch = [];

			arrItems = this.options.currentValue.split(",");
			// remove archived node
			for ( var i = 0, il = arrItems.length; i < il; i++)
			{
				if (Alfresco.util.NodeRef(arrItems[i]).storeType !== "archive")
				{
					arrItemsToFetch.push(arrItems[i]);
				}
			}

			var onSuccess = function ObjectFinder__loadSelectedItems_onSuccess(response)
			{
				var items = response.json.data.items, item, html = '';
				for ( var key in items)
				{
					if (items.hasOwnProperty(key))
					{
						item = items[key];
						html += this._formatCurrentValue(item.type, item.name);
					}
					Dom.get(this.id + "-currentValueDisplay").innerHTML = html;

				}

			};

			if (arrItemsToFetch.length > 0)
			{
				Alfresco.util.Ajax.jsonRequest({
					url : Alfresco.constants.PROXY_URI + "api/forms/picker/items",
					method : "POST",
					dataObj : {
						items : arrItemsToFetch,
						itemValueType : "nodeRef"
					},
					successCallback : {
						fn : onSuccess,
						scope : this
					}
				});
			}

			if (this.options.mode !== "view")
			{
				var me = this, url = Alfresco.constants.PROXY_URI_RELATIVE + 'loftux/peoplesearch?maxResults=5';
				var oDS = new YAHOO.util.XHRDataSource(url);

				// Set the responseType
				oDS.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;

				// Define the schema of the JSON results
				oDS.responseSchema = {
					resultsList : "people",
					fields : [ "firstName", "lastName", "userName", "nodeRef" ]
				};

				// Instantiate the AutoComplete
				var oAC = new YAHOO.widget.AutoComplete(this.id + "-input", this.id + "-container", oDS);

				// Throttle requests sent
				oAC.queryDelay = 0.2;
				// Require user to type at least 3 characters before triggering a
				// query
				oAC.minQueryLength = 2;

				// Always show the container element
				oAC.alwaysShowContainer = false;

				// Enable force selection
				oAC.forceSelection = true;

				// Disable the browser's built-in autocomplete caching mechanism
				oAC.allowBrowserAutocomplete = false;

				// Display up to 5 results in the container
				oAC.maxResultsDisplayed = 5;

				// The webservice needs additional parameters
				oAC.generateRequest = function(sQuery)
				{
					return "&filter=" + sQuery;
				};

				oAC.formatResult = function(oResultData, sQuery, sResultMatch)
				{
					return oResultData[0] + ' ' + oResultData[1] + ' (' + oResultData[2] + ')';
				};

				oAC.suppressInputUpdate = true;
				oAC.itemSelectEvent.subscribe(this.bind(function(sType, oArgs)
				{
					var selected = oArgs[2];

					Dom.get(this.id + "-currentValueDisplay").innerHTML = this._formatCurrentValue("cm:person", selected[0] + ' ' + selected[1] + ' (' + selected[2]+ ')');
					if(this.options.currentValue!==selected[3]){
						//It is a new value set, update the hidden fields
              Dom.get(this.id + "-added").value = selected[3].toString();
              if(this.options.currentValue){
                //We didnt start with a blank value, so mark this one as removed
                Dom.get(this.id + "-removed").value = this.options.currentValue;
              }

					}else{
            //Set it back to blank
            Dom.get(this.id + "-removed").value = "";
            Dom.get(this.id + "-added").value = "";
          }
					Dom.get(this.currentValueHtmlId).value = selected[3];

          if (this.options.mandatory)
          {
            YAHOO.Bubbling.fire("mandatoryControlValueUpdated", this);
          }
				}));
			}
		},

		_formatCurrentValue : function PA_formatCurrentValue(type, name)
		{
			var html = '<div class="itemtype-' + $html(type) + '"><img src="' + Alfresco.constants.URL_RESCONTEXT + 'components/images/filetypes/' +
        Alfresco.util.getFileIcon(name, type, 16) + '"';
			html += ' width="16" alt="" title="' + $html(name) + '" />' + name + '</div>';
			return html;

		}

	});

  /**
    * CategoryAutocomplete constructor.
    *
    * @param htmlId
    *           {String} The HTML id of the parent element
    * @return {Loftux.component.Avtalsdokument} The new Avtalsdokument instance
    * @constructor
    */
   Loftux.controls.CategoryAutocomplete = function(htmlId, currentValueHtmlId)
   {
      Loftux.controls.CategoryAutocomplete.superclass.constructor.call(this, "Loftux.controls.CategoryAutocomplete", htmlId, [ "autocomplete" ]);
      this.currentValueHtmlId = currentValueHtmlId;

      return this;
   };
   /**
    * Extend from Alfresco.component.Base
    */
   YAHOO.extend(Loftux.controls.CategoryAutocomplete, Alfresco.component.Base, {
      options : {
         mode : "view",
         currentValue : "",
         mandatory : false
      },
      onReady : function PA_onReady()
      {

         var arrItems = [], arrItemsToFetch = [];

         arrItems = this.options.currentValue.split(",");
         // remove archived node
         for ( var i = 0, il = arrItems.length; i < il; i++)
         {
            if (Alfresco.util.NodeRef(arrItems[i]).storeType !== "archive")
            {
               arrItemsToFetch.push(arrItems[i]);
            }
         }

         var onSuccess = function ObjectFinder__loadSelectedItems_onSuccess(response)
         {
            var items = response.json.data.items, item, html = '';
            for ( var key in items)
            {
               if (items.hasOwnProperty(key))
               {
                  item = items[key];
                  html += this._formatCurrentValue(item.type, item.name);
               }
               Dom.get(this.id + "-currentValueDisplay").innerHTML = html;

            }

         };

         if (arrItemsToFetch.length > 0)
         {
            Alfresco.util.Ajax.jsonRequest({
               url : Alfresco.constants.PROXY_URI + "api/forms/picker/items",
               method : "POST",
               dataObj : {
                  items : arrItemsToFetch,
                  itemValueType : "nodeRef"
               },
               successCallback : {
                  fn : onSuccess,
                  scope : this
               }
            });
         }

         if (this.options.mode !== "view")
         {
            var me = this, url = Alfresco.constants.PROXY_URI_RELATIVE + 'loftux/categorysearch';
            var oDS = new YAHOO.util.XHRDataSource(url);

            // Set the responseType
            oDS.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;

            // Define the schema of the JSON results
            oDS.responseSchema = {
               resultsList : "results",
               fields : [ "nodeRef", "name" ]
            };

            // Instantiate the AutoComplete
            var oAC = new YAHOO.widget.AutoComplete(this.id + "-input", this.id + "-container", oDS);

            // Throttle requests sent
            oAC.queryDelay = 0.2;
            // Require user to type at least 3 characters before triggering a
            // query
            oAC.minQueryLength = 1;

            // Always show the container element
            oAC.alwaysShowContainer = false;

            // Enable force selection
            oAC.forceSelection = true;

            // Disable the browser's built-in autocomplete caching mechanism
            oAC.allowBrowserAutocomplete = false;

            // Display up to 5 results in the container
            oAC.maxResultsDisplayed = 5;

            // The webservice needs additional parameters
            oAC.generateRequest = function(sQuery)
            {
               return "?q="  + sQuery;
            };

            oAC.formatResult = function(oResultData, sQuery, sResultMatch)
            {
               return oResultData[1];
            };

            oAC.suppressInputUpdate = true;
            oAC.itemSelectEvent.subscribe(this.bind(function(sType, oArgs)
            {
               var selected = oArgs[2];

               Dom.get(this.id + "-currentValueDisplay").innerHTML = this._formatCurrentValue("cm:category", selected[1]);

               Dom.get(this.currentValueHtmlId).value = selected[0];

               if (this.options.mandatory)
               {
                  YAHOO.Bubbling.fire("mandatoryControlValueUpdated", this);
               }
            }));
         }
      },

      _formatCurrentValue : function PA_formatCurrentValue(type, name)
      {
         var html = '<div class="itemtype-' + $html(type) + '"><img src="' + Alfresco.constants.URL_RESCONTEXT + 'components/images/filetypes/' +
           Alfresco.util.getFileIcon(name, type, 16) + '"';
         html += ' width="16" alt="" title="' + $html(name) + '" />' + name + '</div>';
         return html;

      }

   });
})();
