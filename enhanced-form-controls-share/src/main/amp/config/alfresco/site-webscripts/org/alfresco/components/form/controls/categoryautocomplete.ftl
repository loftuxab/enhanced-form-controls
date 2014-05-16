<#assign controlId = fieldHtmlId + "-cntrl">

<script type="text/javascript">//<![CDATA[
(function()
{
   var categoryautocomplete = new Loftux.controls.CategoryAutocomplete("${controlId}", "${fieldHtmlId}").setOptions(
   {
      mode: "${form.mode}",
      currentValue: "${field.value}",
      <#if field.mandatory??>
      mandatory: ${field.mandatory?string},
      <#elseif field.endpointMandatory??>
      mandatory: ${field.endpointMandatory?string},
      </#if>
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
         <#if field.disabled == false>
            <div id="${controlId}-currentValueDisplay" class="current-values"></div>
            <input type="hidden" id="${fieldHtmlId}" name="${field.name}" value="${field.value?html}" />
            <input type="text" id="${controlId}-input" class="loftuxautcomplete" name="-" />
            <div id="${controlId}-container" class="loftuxautcomplete"></div>
         </#if>
         <#if field.control.params.showSubCategoriesOption?? && field.control.params.showSubCategoriesOption == "true">
             <div class="subcats-option">
                 <input type="checkbox" name="${field.name}_usesubcats" value="true" checked="true" />&nbsp;${msg("form.control.category.include.subcats")}
             </div>
         </#if>
      </div>
   </#if>
</div>
