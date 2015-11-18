
<#escape x as jsonUtils.encodeJSONString(x)>
{ 
"results":[
	<#if data??>
	<#list data as item>	
   {"name": "${item.name}",
    "nodeRef": "${item.nodeRef}"
   }<#if item_has_next>,</#if>
	</#list>
	</#if>
	]
}
</#escape>