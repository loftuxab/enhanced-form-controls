<#macro personJSONinner person>
<#local p=person.properties>
<#escape x as jsonUtils.encodeJSONString(x)>
	"userName": "${p.userName}",
	"firstName": <#if p.firstName??>"${p.firstName}"<#else>null</#if>,
	"lastName": <#if p.lastName??>"${p.lastName}"<#else>null</#if>,
	"nodeRef": "${person.nodeRef}"
</#escape>
</#macro>

<#macro personJSON person>
{
<@personJSONinner person=person/>
}
</#macro>
{
"people" : [
	<#list peoplelist as person>
		<@personJSON person=person/>
		<#if person_has_next>,</#if>
	</#list>
]
}
