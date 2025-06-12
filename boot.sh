main() {
    frontend_path="C:/Gabriel/Projetos/SGBR/5_DC_SGBR/count"
    api_path="C:/Gabriel/Projetos/SGBR/5_DC_SGBR/api"

    # Tenta no C:
    if [ ! -d "$frontend_path" ]; then
        frontend_path="D:/Gabriel/Projetos/SGBR/5_DC_SGBR/count"
    fi

    if [ ! -d "$api_path" ]; then
        api_path="D:/Gabriel/Projetos/SGBR/5_DC_SGBR/api"
    fi

    cd "$frontend_path" || { echo "Erro ao acessar $frontend_path"; exit 1; }
    start bash -c "quasar dev"

    cd "$api_path" || { echo "Erro ao acessar $api_path"; exit 1; }
    start bash -c "npm run dev"
}

main
