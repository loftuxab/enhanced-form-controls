<#assign controlId = fieldHtmlId + "-cntrl">
<#assign usernameOnly = (field.control.params.usernameOnly!false)?string >

<script type="text/javascript">//<![CDATA[
(function()
{
   var loftuxautcomplete = new Loftux.controls.PeopleAutocomplete("${controlId}", "${fieldHtmlId}").setOptions(
   {
      mode: "${form.mode}",
      currentValue: "${field.value}",
      <#if field.mandatory??>
      mandatory: ${field.mandatory?string},
      <#elseif field.endpointMandatory??>
      mandatory: ${field.endpointMandatory?string},
      </#if>
      usernameOnly : ${usernameOnly}

   }).setMessages(
      ${messages}
   );

})();
//]]></script>

<div class="form-field">
   <#if form.mode == "view">
      <div id="${controlId}" class="viewmode-field">
         <#if field.endpointMandatory && field.value == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <span id="${controlId}-currentValueDisplay" class="viewmode-value current-values"></span>
      </div>
   <#else>
      <label for="${controlId}">${field.label?html}:<#if field.endpointMandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>

      <div id="${controlId}" class="">
            <div id="${controlId}-currentValueDisplay" class="current-values"></div>
            <#if usernameOnly == "true">
                <input type="hidden" id="${controlId}-username" name="${field.name}" value="${field.value?html}" />
            <#else>
                <input type="hidden" id="${fieldHtmlId}" name="-" value="${field.value?html}" />
                <input type="hidden" id="${controlId}-added" name="${field.name}_added" />
                <input type="hidden" id="${controlId}-removed" name="${field.name}_removed" />
            </#if>
             <input type="text" id="${controlId}-input" class="loftuxautcomplete" name="-" />
             <div id="${controlId}-container" class="loftuxautcomplete"></div>

      </div>
   </#if>
</div>