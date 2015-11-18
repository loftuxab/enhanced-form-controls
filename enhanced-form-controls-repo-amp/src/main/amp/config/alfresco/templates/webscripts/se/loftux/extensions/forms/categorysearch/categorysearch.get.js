
function getList()
{

	//First, get all the maintenance list that current user is set as responsible for
	var query = 'PATH:"/cm:categoryRoot/cm:generalclassifiable//*" AND TYPE:"cm:category"';

	//Apply filter if submitted
	var q = (args.q !== null) ? args.q : "";
	if(q){
		query += " AND @cm\\:name:\"*"+q+"*\"";
	}


	var sort=
	{
		column: "@cm:name",
		ascending: true
	};

	var maxItems =(args.maxItems !== null) ? parseInt(args.maxItems, 10) : 5;
	var page =
	{
		maxItems: maxItems
	};

	var searchdef =
	{
		query: query,
		//sort: [sort],
		page: page,
		language: "fts-alfresco"
	};

	var listnodes = search.query(searchdef);


	return listnodes;
}

model.data = getList();
