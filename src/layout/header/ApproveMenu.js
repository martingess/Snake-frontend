import React, {useEffect} from 'react'
import ListForApprove from './ApproveMenu/ListForApprove';
import {Popover, Badge, Button, Spin } from 'antd';
import { getItemsForApprove, getPatientsResults } from '../../modules/redDoctor';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../helpers/api';

export default function ApproveMenu() {
    const dispatch = useDispatch();
    const doctorData = useSelector(state => state.doctor)
    useEffect(() => {
      getItemsForApprove(dispatch)();
    }, []);
    //TODO: запрашивать результаты после этого (сделать в АПИ фетч на результаты)
    const approveResult = (id) => async () => {
        await api.doctorApproveResult(id);
        dispatch(getItemsForApprove)()
        dispatch(getPatientsResults)()
    }
    const rejectResult = (id) => async () => {
        await api.doctorRejectResult(id);
        dispatch(getItemsForApprove)();
    }
    return (
            <Popover content={ doctorData.approveDataStatus === 'done' ?
            <ListForApprove rejectResult={rejectResult} approveResult={approveResult} approveData={doctorData.forApprove} /> :
            <Spin />
            }>
              <Badge count={doctorData.forApprove ? doctorData.forApprove.length : 0}>
                <Button>Запросы</Button>
              </Badge>
            </Popover>
          
    )
}