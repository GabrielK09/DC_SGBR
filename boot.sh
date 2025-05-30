main()
{
	frontend_path="D:/Gabriel/Projetos/SGBR/5_DC_SGBR/count"
	api_path="D:/Gabriel/Projetos/SGBR/5_DC_SGBR/api"
	
	cd $frontend_path
	start bash -c "quasar dev"

	cd $api_path

	start bash -c "npm run dev"

}

main
