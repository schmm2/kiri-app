import React, { useEffect, useState } from "react";
import { updatedDiff } from 'deep-object-diff';
import { Table, Space, Button } from 'antd';
import { RenderData } from 'components/RenderData'
import { Link } from "react-router-dom";

import { useLazyQuery, useMutation } from '@apollo/client';
import { getNewestConfigurationVersionsByIds } from "graphql/queries"
import DefaultPage from '../../layouts/DefaultPage';

export default function MEMConfigurationCompare(props) {
    const { match: { params } } = props;
    const [diffTable, setDiffTable] = useState([]);

    const [getConfigurations, { loading, error, data }] = useLazyQuery(getNewestConfigurationVersionsByIds, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            showDiff(
                data.configurationByIds[0].newestConfigurationVersion,
                data.configurationByIds[1].newestConfigurationVersion
            );
        }, onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        let version1 = params.configOne;
        let version2 = params.configTwo;

        getConfigurations({
            variables: {
                ids: [
                    version1,
                    version2
                ]
            }
        });
    }, [params.configOne, params.configTwo]);

    const versionHistoryColumns = [
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Active Version',
            dataIndex: 'activeVersion',
            key: 'activeVersion',
            render: (text, record) => <RenderData record={record.versionOne} />
        },
        {
            title: 'Previous Version',
            dataIndex: 'previousVersion',
            key: 'previousVersion',
            render: (text, record) => <RenderData record={record.versionTwo} />
        },
    ];


    const showDiff = (versionOne, versionTwo) => {

        let versionOneValue = JSON.parse(versionOne.value);
        let versionTwoValue = JSON.parse(versionTwo.value);

        let difference = updatedDiff(versionOneValue, versionTwoValue);

        /*
        console.log("Version One")
        console.log(versionOneValue)
        console.log("Version Two")
        console.log(versionTwoValue)
        console.log("difference")
        console.log(difference);*/

        // build version history
        let index = 1;
        let dataSourceTmp = [];
        for (let key in difference) {
            // console.log(key);
            let newDataEntry = {
                key: index,
                value: key,
                versionOne: versionOneValue[key],
                versionTwo: versionTwoValue[key]
            }
            // console.log(newDataEntry);
            dataSourceTmp.push(newDataEntry);
            index++;
        }
        setDiffTable(dataSourceTmp);
    }

    return (
        <DefaultPage>
            <Table loading={loading} dataSource={diffTable} columns={versionHistoryColumns} />
            <div className="controlBottom">
                <Space align="end">
                    <Button>
                        <Link to="#" onClick={props.history.goBack}>Back</Link>
                    </Button>
                </Space>
            </div>
        </DefaultPage>
    )
}