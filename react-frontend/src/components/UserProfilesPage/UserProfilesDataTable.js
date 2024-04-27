
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const UserProfilesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.userId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.imageUrl}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.profileStatusId}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.uuId}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.oauthProviderId}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.oauthProviderName}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.loginTypeId}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.dateOfBirth}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.gender}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.accountStatus}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.currentMobileNumberId}</p>
    const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.currentRoleId}</p>
    const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.currentCompanyId}</p>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.currentBranchId}</p>
    const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.currentDepartmentId}</p>
    const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.currentSubDepartmentId}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="userId" header="User Id" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="imageUrl" header="Image Url" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="profileStatusId" header="Profile Status Id" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="uuId" header="Uu Id" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="oauthProviderId" header="Oauth Provider Id" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="oauthProviderName" header="Oauth Provider Name" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="loginTypeId" header="Login Type Id" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="dateOfBirth" header="Date Of Birth" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="gender" header="Gender" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="accountStatus" header="Account Status" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="currentMobileNumberId" header="Current Mobile Number Id" body={pTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="currentRoleId" header="Current Role Id" body={pTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="currentCompanyId" header="Current Company Id" body={pTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="currentBranchId" header="Current Branch Id" body={pTemplate13} style={{ minWidth: "8rem" }} />
            <Column field="currentDepartmentId" header="Current Department Id" body={pTemplate14} style={{ minWidth: "8rem" }} />
            <Column field="currentSubDepartmentId" header="Current Sub Department Id" body={pTemplate15} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default UserProfilesDataTable;