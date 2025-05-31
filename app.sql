select
    (vendaliquida - sangria - transferencia + suprimento + recebimentos) totalcaixa

    from(

    select
            sum(sangria) sangria,
            sum(suprimento) suprimento,
            sum(transferencia) transferencia,
            sum(recebimentos) recebimentos,
            sum(vendaliquida) vendaliquida

            from(

            select
                (valorsaida) as sangria,
                0 suprimento,
                0 transferencia,
                0 recebimentos,
                0 vendaliquida,
                cast(datahoracadastro as date) data,
                Cast(datahoracadastro as time) horario,
                tca.codfuncionario codfuncionario,
                tca.centrocusto centrocusto
            from
                tcaixa tca
            where
                origem = 'SANGRIA NOTA MANUAL'

            union all

            select
                0 sangria,
                (valorentrada) as suprimento,
                0 transferencia,
                0 recebimentos,
                0 vendaliquida,
                cast(datahoracadastro as date) data,
                Cast(datahoracadastro as time) horario,
                tca.codfuncionario codfuncionario,
                tca.centrocusto centrocusto
            from
                tcaixa tca
            where
                origem = 'SUPRIMENTO NOTA MANUAL'

            union all

            select
                0 sangria,
                0 suprimento,
                (VALORSAIDA) as transferencia,
                0 recebimentos,
                0 vendaliquida,
                cast(datahoracadastro as date) data,
                Cast(datahoracadastro as time) horario,
                codfuncionario codfuncionario,
                centrocusto centrocusto
            from
                tcaixa
            where
                origem = 'TRANSFERÊNCIA NOTA MANUAL'

            union all

            select
            0 sangria,
            0 suprimento,
            0 transferencia,
            (valorentrada - valorsaida) as recebimentos,
            0 vendaliquida,
            Cast(datahoracadastro as date) data,
            Cast(datahoracadastro as time) horario,
            codfuncionario codfuncionario,
            centrocusto centrocusto

        from tcaixa

        where
            codreceber IS NOT NULL
            and (origem not like '%SANGRIA%') AND (origem not like '%SUPRIMENTO%')

        union all

        Select
            0 sangria,
            0 suprimento,
            0 transferencia,
            0 recebimentos,
            coalesce((totalnota), 0) as vendaliquida,
            cast(nm.dataehoracadastro as date) data,
            cast(nm.dataehoracadastro as time) horario,
            nm.codfuncionario codfuncionario,
            nm.centrocusto centrocusto

        from tnotaconsumidor nm

        where
            nm.datafaturada is not null
            and nm.faturada = 'SIM'

            )a

        where data between '31.05.2025' and '31.05.2025'
        
                                        

                                )b 
[31/05/2025 09:59:25.00 - 00:00:00.0010011]: Nota Manual MEI - 1º parte do fechamento por período: SELECT 
        SUM(vendaliquida) + SUM(descontos) - SUM(acrescimos) + SUM(canceladas) AS vendabruta,
        SUM(canceladas) AS canceladas,
        SUM(descontos) AS descontos,
        SUM(acrescimos) AS acrescimos,
        SUM(recebimentos) AS recebimentos,
        SUM(taxaservico) AS taxaservico,
        SUM(vendaliquida) AS vendaliquida,
        SUM(valorcondicao) AS valorcondicao
    FROM (
        SELECT 
            nm.totalbruto AS vendabruta,
            0 AS canceladas,
            0 AS descontos,
            0 AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            CAST(nm.dataehoracadastro AS DATE) AS data,
            CAST(nm.dataehoracadastro AS TIME) AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            0 AS valorcondicao
        FROM tnotaconsumidor nm

        UNION ALL

        SELECT 
            0 AS vendabruta,
            nm.totalnota AS canceladas,
            0 AS descontos,
            0 AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            CAST(nm.dataehoracadastro AS DATE) AS data,
            CAST(nm.dataehoracadastro AS TIME) AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            0 AS valorcondicao
        FROM tnotaconsumidor nm
        WHERE nm.cancelado = 'SIM'

        UNION ALL

        SELECT 
            0 AS vendabruta,
            0 AS canceladas,
            COALESCE(nm.desconto, 0) AS descontos,
            0 AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            CAST(nm.dataehoracadastro AS DATE) AS data,
            CAST(nm.dataehoracadastro AS TIME) AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            0 AS valorcondicao
        FROM tnotaconsumidor nm
        WHERE nm.cancelado <> 'SIM' AND faturada = 'SIM'

        UNION ALL

        SELECT 
            0 AS vendabruta,
            0 AS canceladas,
            0 AS descontos,
            COALESCE(nm.outrosvalores, 0) AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            CAST(nm.dataehoracadastro AS DATE) AS data,
            CAST(nm.dataehoracadastro AS TIME) AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            0 AS valorcondicao
        FROM tnotaconsumidor nm
        WHERE nm.cancelado <> 'SIM' AND faturada = 'SIM'

        UNION ALL

        SELECT 
            0 AS vendabruta,
            0 AS canceladas,
            0 AS descontos,
            0 AS acrescimos,
            (valorentrada - valorsaida) AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            CAST(datahoracadastro AS DATE) AS data,
            CAST(datahoracadastro AS TIME) AS horario,
            codfuncionario,
            centrocusto,
            0 AS valorcondicao
        FROM tcaixa tca
        WHERE TCA.codreceber IS NOT NULL
        and (tca.origem not like '%SANGRIA%') AND (tca.origem not like '%SUPRIMENTO%')

        UNION ALL

    select
            0 vendabruta,                        
        0 canceladas,                        
        0 as descontos,                        
        0 as acrescimos,
        0 as recebimentos,
        coalesce(taxaservico, 0) as taxaservico,                        
        0 vendaliquida ,                        
        Cast(tc.datafechamento as date) data,
        Cast(tc.horafechamento as time) horario,
        nm.codfuncionario codfuncionario,
        nm.centrocusto centrocusto,
        0 as valorcondicao

        from tnotaconsumidor nm
        inner join tcomanda tc
        on nm.codmodulo = tc.controle

        where
            nm.modulo = 'COMANDAS'
            and nm.datafaturada is not null
            and nm.cancelado <> 'SIM'

        union all

        SELECT 
            0 AS vendabruta,
            0 AS canceladas,
            0 AS descontos,
            0 AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            COALESCE(nm.totalnota, 0) AS vendaliquida,
            CAST(nm.dataehoracadastro AS DATE) AS data,
            CAST(nm.dataehoracadastro AS TIME) AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            0 AS valorcondicao
        FROM tnotaconsumidor nm
        WHERE nm.cancelado <> 'SIM' AND faturada = 'SIM' AND nm.datafaturada IS NOT NULL

        UNION ALL

        SELECT 
            0 AS vendabruta,
            0 AS canceladas,
            0 AS descontos,
            0 AS acrescimos,
            0 AS recebimentos,
            0 AS taxaservico,
            0 AS vendaliquida,
            nm.dataemissao AS data,
            nm.horafaturada AS horario,
            nm.codfuncionario,
            nm.centrocusto,
            CASE WHEN FORM.tipolancamentofinanceiro = 'PARCELAR' THEN FORM.valorpago ELSE 0 END  as valorcondicao
        FROM tnotaconsumidor nm
        INNER JOIN tformapagamentonotamanual FORM ON nm.controle = FORM.codnotamanual
        WHERE nm.cancelado <> 'SIM' AND nm.datafaturada IS NOT NULL
    ) a
        where data between '31.05.2025' and '31.05.2025' and ( (vendabruta = 0 and canceladas = 0) or (vendabruta <> 0 or canceladas <> 0))
        
        
[31/05/2025 09:59:25.00 - 00:00:00]: Nota Manual MEI - 2º parte do fechamento por período: select
        sum(sangria) sangria,
        sum(suprimento) suprimento,
        sum(transferencia) transferencia,
        sum(totalcaixa) totalcaixa

        from(

select
    (valorsaida) as sangria,
    0 suprimento,
    0 transferencia,
    0 totalcaixa,
    cast(datahoracadastro as date) data,
    Cast(datahoracadastro as time) horario,
    tca.codfuncionario codfuncionario,
    tca.centrocusto centrocusto
from
    tcaixa tca
where
    origem = 'SANGRIA NOTA MANUAL'                    

union all

select
    0 sangria,
    (valorentrada) as suprimento,
    0 transferencia,
    0 totalcaixa,
    cast(datahoracadastro as date) data,
    Cast(datahoracadastro as time) horario,
    tca.codfuncionario codfuncionario,
    tca.centrocusto centrocusto
from
    tcaixa tca
where
    origem = 'SUPRIMENTO NOTA MANUAL'                        

union all

select
    0 sangria,
    0 suprimento,
    (VALORSAIDA) as transferencia,
    0 totalcaixa,
    cast(datahoracadastro as date) data,
    Cast(datahoracadastro as time) horario,
    codfuncionario codfuncionario,
    centrocusto centrocusto
from
    tcaixa tca
where
    origem = 'TRANSFERÊNCIA NOTA MANUAL'                        

union all

select
    0 sangria,
    0 suprimento,
    0 transferencia,
    (tca.valorentrada - tca.valorsaida) totalcaixa,
    cast(datahoracadastro as date) data,
    Cast(datahoracadastro as time) horario,
    tca.codfuncionario codfuncionario,
    tca.centrocusto centrocusto
from
    tcaixa tca
left join
    tnotaconsumidor nm
on
    tca.codmodulo = nm.controle
where
    (((tca.origem = 'NOTA CONSUMIDOR') or (tca.origem = 'SANGRIA NOTA MANUAL') or (tca.origem = 'SUPRIMENTO NOTA MANUAL')) or (tca.codreceber is not null))
    and tca.codreceber is null

    )a

        where data between '31.05.2025' and '31.05.2025'
        
        
[31/05/2025 09:59:25.01 - 00:00:00.0010009]: Nota Manual MEI - 3º parte do fechamento por período: select
                codespecie,
                especie,
                sum(valorpago) total

                from(

            select
                form.codespecie,
                form.especie,
                form.valorpago,
                nm.dataemissao data,
                cast(nm.dataehoracadastro as time) horario,
                nm.codfuncionario,
                nm.centrocusto,
                form.tipolancamentofinanceiro tipo

            from tformapagamentonotamanual form
            inner join tnotaconsumidor nm
            on form.codnotamanual = nm.controle

            where cancelado <> 'SIM'
            and valorpago > 0
            and faturada = 'SIM'

            union all

            select

            tca.codespecie,
            tca.especie,
            (tca.valorentrada - tca.valorsaida) valorpago,
            cast(tca.datahoracadastro as date) data,
            cast(tca.datahoracadastro as time) horario,
            tca.codfuncionario codfuncionario,
            tca.centrocusto,
            'CAIXA' tipo

            from tcaixa tca
            inner join treceber tre on
            tca.codreceber = tre.controle

            where tca.controle is null

                )a

                where data between '31.05.2025' and '31.05.2025'
                
                
                and tipo = 'CAIXA'

                group by codespecie,especie

                order by codespecie
[31/05/2025 09:59:25.03 - 00:00:00.0089595]: Nota Manual MEI - 4º parte do fechamento por período: select
        tca.datahoracadastro,
        tca.valorentrada,
        tca.descricaolancamento                                                            
    from
    (
        select
            cast(tca.datahoracadastro as date) as data,
            cast(tca.datahoracadastro as time) as horario,
            tca.datahoracadastro,
            tca.valorentrada,
            tca.descricaolancamento,
            tca.codfuncionario codfuncionario,
            tca.centrocusto centrocusto
        from
            tcaixa tca

            where tca.origem = 'SUPRIMENTO NOTA MANUAL'                                
    ) as tca
                                    
    where data between '31.05.2025' and '31.05.2025'
    
    
[31/05/2025 09:59:25.03 - 00:00:00]: Nota Manual MEI - 5º parte do fechamento por período: select
                                        tca.datahoracadastro,
                                        tca.valorsaida,
                                        tca.descricaolancamento
                                    from
                                    (
                                        select
                                            cast(tca.datahoracadastro as date) as data,
                                            cast(tca.datahoracadastro as time) as horario,
                                            tca.datahoracadastro,
                                            tca.valorsaida,
                                            tca.descricaolancamento,
                                            tca.codfuncionario codfuncionario,
                                            tca.centrocusto centrocusto
                                        from
                                            tcaixa tca
                                            
                                            where tca.origem = 'SANGRIA NOTA MANUAL'
                                    ) as tca
                                    
                                    where data between '31.05.2025' and '31.05.2025'
                                    
                                    
[31/05/2025 09:59:25.04 - 00:00:00]: Nota Manual MEI - 6º parte do fechamento por período: select
                dataehoracancelamento,
                valortotalnfce,
                valorproduto,
                chavenfce,
                justificativacancelamento,
                protocolocancelamento

                from(

                    select
                        '' dataehoracancelamento,
                        0 valortotalnfce,
                        0 valorproduto,
                        '' chavenfce,
                        '' justificativacancelamento,
                        '' protocolocancelamento,
                        '' as data,
                        '' as horario,
                        '' codfuncionario,
                        '' centrocusto

                    from tnotaconsumidor nm

                    where nm.controle is null

                        )a
[31/05/2025 09:59:25.05 - 00:00:00]: Nota Manual MEI - 7º parte do fechamento por período: select
        centrocusto,
        sum(valorentrada) total

        from(

    select
        tca.centrocusto,
        sum(tca.valorentrada - tca.valorsaida) valorentrada,
        cast(tca.datahoracadastro as date) data,
        cast(tca.datahoracadastro as time) horario,
        tca.codfuncionario codfuncionario
    from
        tcaixa tca
    left join tnotaconsumidor nm
    on
        tca.codmodulo = nm.controle
    where
        (((tca.origem = 'NOTA CONSUMIDOR') or (tca.origem = 'SANGRIA NOTA MANUAL') or (tca.origem = 'SUPRIMENTO NOTA MANUAL')))                            

    group by
        tca.centrocusto,
        data,
        horario,
        codfuncionario

        )a

        where data between '31.05.2025' and '31.05.2025'
        
        

        group by centrocustO
[31/05/2025 09:59:25.05 - 00:00:00]: Nota Manual MEI - 8º parte do fechamento por período: select
        sum(vendasCanceladas) vendasCanceladas,
        sum(itensCancelados) itensCancelados,
        0 inutilizadas,
        sum(emitidas) emitidas

        from(

    select
        0 vendasCanceladas,
        count(itnm.controle) itensCancelados,
        0 emitidas,
        cast(nm.dataehoracadastro as date) data,
        cast(nm.dataehoracadastro as time) horario,
        nm.codfuncionario codfuncionario,
        nm.centrocusto centrocusto

    from titennotaconsumidor itnm
    inner join tnotaconsumidor nm
    on itnm.codnotaconsumidor = nm.controle

    where exists(select tca.controle from tcaixa tca where tca.codmodulo = nm.controle and tca.origem = 'NOTA CONSUMIDOR' and tca.codreceber is null)
        and itnm.cancelado = 'SIM'

    group by
        data,horario,codfuncionario, centrocusto

    union all

    select
        count(nm.controle) vendasCanceladas,
        0 itensCancelados,
        0 emitidas,
        cast(nm.dataehoracadastro as date) data,
        cast(nm.dataehoracadastro as time) horario,
        nm.codfuncionario codfuncionario,
        nm.centrocusto centrocusto

    from tnotaconsumidor nm                 

    where exists(select tca.controle from tcaixa tca where tca.codmodulo = nm.controle and tca.origem = 'NOTA CONSUMIDOR' and tca.codreceber is null)
    and nm.cancelado = 'SIM'
    and nm.faturada = 'SIM'

    group by
        data,horario,codfuncionario, centrocusto

    union all

    select
        0 vendasCanceladas,
        0 itensCancelados,
        count(nm.controle) emitidas,
        cast(nm.dataehoracadastro as date) data,
        cast(nm.dataehoracadastro as time) horario,
        nm.codfuncionario codfuncionario,
        nm.centrocusto centrocusto
    from                                                        
        tnotaconsumidor nm

        where exists(select tca.controle from tcaixa tca where tca.codmodulo = nm.controle and tca.origem = 'NOTA CONSUMIDOR' and tca.codreceber is null)
        and nm.faturada = 'SIM'
        and nm.datafaturada is not null
        and nm.cancelado <> 'SIM'

    group by
        data,horario,codfuncionario, centrocusto

        )a

            where data between '31.05.2025' and '31.05.2025'
            
            
        
        
[31/05/2025 09:59:25.06 - 00:00:00]: Nota Manual MEI - 10º parte do fechamento por período: select
    centrocusto,
    sum(valorentrada) valorentrada,
    sum(valorsaida) valorsaida

    from(

select
        tca.centrocusto CENTROCUSTO,
        (cast(coalesce(tca.valorentrada, 0) as float)) VALORENTRADA,
        (cast(coalesce(tca.valorsaida, 0) as float)) VALORSAIDA,
        cast(tca.datahoracadastro as date) data,
        cast(tca.datahoracadastro as time) horario,
        tca.codfuncionario codfuncionario
    from
        tcaixa tca
    left join tnotaconsumidor nm
    on
        tca.codmodulo = nm.controle                        
    
    WHERE
        (((tca.origem = 'NOTA CONSUMIDOR') or (tca.origem = 'SANGRIA NOTA MANUAL') or (tca.origem = 'SUPRIMENTO NOTA MANUAL')))
        and tca.codreceber is null

    )a

    where data between '31.05.2025' and '31.05.2025'
    
    

    group by centrocusto
[31/05/2025 09:59:25.06 - 00:00:00]: Nota Manual MEI - 11º parte do fechamento por período: select
    codreceber,
    documento,
    sum(entrada - saida) entrada,
    especie

    from(

select
    tca.codreceber codreceber,
    tca.documento documento,
    tca.valorentrada entrada,
    tca.valorsaida saida,
    tca.especie especie,
    cast(tca.datahoracadastro as date) data,
    cast(tca.datahoracadastro as time) horario,
    tca.codfuncionario codfuncionario,
    tca.centrocusto
from
    tcaixa tca
where                        
    tca.codreceber is not null                 
    and (tca.origem not like '%SANGRIA%') AND (tca.origem not like '%SUPRIMENTO%')

    )a

    where data between '31.05.2025' and '31.05.2025'
    
    

    group by codreceber, documento, especie
    having sum(entrada - saida) > 0
[31/05/2025 09:59:25.07 - 00:00:00]: Nota Manual MEI - 12º parte do fechamento por período: select
    especie,
    sum(entrada) total

    from(

select
    tca.codreceber codreceber,
    tca.documento documento,
    tca.valorentrada entrada,
    tca.especie especie,
    cast(tca.datahoracadastro as date) data,
    cast(tca.datahoracadastro as time) horario,
    tca.codfuncionario codfuncionario,
    tca.centrocusto
from
    tcaixa tca
where
    tca.codreceber is not null
    and (tca.origem not like '%SANGRIA%') AND (tca.origem not like '%SUPRIMENTO%')                                  

    )a

    where data between '31.05.2025' and '31.05.2025'
    
    

    group by especie
[31/05/2025 09:59:25.08 - 00:00:00]: Nota Manual MEI - 13º parte do fechamento por período: select
    codproduto,
    produto,
    sum(qtdevendida) qtdevendida,
    sum(totalliquido) totalliquido

    from(

    select
            it.codproduto codproduto,
            it.produto produto,
            (it.qtde) qtdevendida,
            (it.totaliquido) totalliquido,
            nm.dataemissao data,
            nm.horafaturada horario,
            nm.codfuncionario codfuncionario,
            nm.centrocusto centrocusto

    from titennotaconsumidor it
    inner join tnotaconsumidor nm
    on nm.controle = it.codnotaconsumidor

    where
        nm.cancelado <> 'SIM'
        and faturada = 'SIM'
        and nm.datafaturada is not null 

)a

where data between '31.05.2025' and '31.05.2025'



group by codproduto, produto
