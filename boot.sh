main()
{
	frontend_path="D:/Gabriel/Projetos/SGBR/4_Estudo_Node/6_discord/count"
	api_path="D:/Gabriel/Projetos/SGBR/4_Estudo_Node/6_discord/api"
	
	cd $frontend_path
	start bash -c "quasar dev"

	cd $api_path

	start bash -c "npm run dev"

}

main
