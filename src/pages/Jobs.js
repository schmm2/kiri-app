import React, { useEffect, useReducer } from "react";
import { listJobs } from "graphql/queries";
import { Table, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import { onCreateJob, onUpdateJob } from "graphql/subscriptions";
import { renderDate } from 'util/renderDate'
import moment from 'moment';

export default function Jobs(props) {
  const { match: { params } } = props;

  const initialState = {
    jobs: [],
    loading: true,
    error: false
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_JOBS':
        return { ...state, jobs: action.jobs, loading: false }
      case 'ADD_JOB':
        return { ...state, jobs: [action.job, ...state.jobs] }
      case 'UPDATE_JOB':
        return {
          ...state,
          jobs: state.jobs.map(
            (job, i) => job.id === action.job.id ? action.job : job
          )
        }
      case 'ERROR':
        return { ...state, loading: false, error: true }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchJobs() {
    try {
      /*
      let jobsData = await API.graphql(graphqlOperation(listJobs));
      jobsData = jobsData.data.listJobs.items;

      if (params.tenantId) {
        jobsData = jobsData.filter((job) => job.tenant.id === params.tenantId);
      }
      dispatch({ type: 'SET_JOBS', jobs: jobsData })*/
    } catch (err) {
      console.error("error fetching jobs");
      console.log(err);
      dispatch({ type: 'ERROR' })
    }
  }

  useEffect(() => {
    fetchJobs();

    let userName = "";

    /*
    const subscriptionOnCreateJob = API.graphql({
      query: onCreateJob,
      variables: { owner: userName }
    }).subscribe({
      next: jobData => {
        const job = jobData.value.data.onCreateJob;
        dispatch({ type: 'ADD_JOB', job })
      },
    })

    const subscriptionOnUpdateJob = API.graphql({
      query: onUpdateJob,
      variables: { owner: userName }
    }).subscribe({
      next: jobData => {
        const job = jobData.value.data.onUpdateJob;
        dispatch({ type: 'UPDATE_JOB', job })
      },
    })

    return () => {
      subscriptionOnCreateJob.unsubscribe();
      subscriptionOnUpdateJob.unsubscribe();
    }*/
  }, []);

  const columns = [
    {
      title: "Tenant",
      dataIndex: ["tenant", "name"],
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      render: (state) => {
        let color = "green";

        switch (state) {
          case "STARTED":
            color = "blue";
            break;
          case "ERROR":
            color = "red";
            break;
          case "WARNING":
            color = "orange";
            break;
          default:
            break;
        }
        
        return (
          <Tag color={color} key={state}>
            {state}
          </Tag>
        );
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      render: (text, record) => renderDate(text),
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      defaultSortOrder: 'descend'
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        <Table loading={state.loading} rowKey="id" columns={columns} dataSource={state.jobs} onChange={onChange} />
      </div>
      <Button>
        <Link to={"/tenants"}>Back</Link>
      </Button>
    </div>
  );
}
