
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const ServicePermissionsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.roleId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.userId}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.serviceId}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.read}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.create}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.updateany}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.updateown}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.deleteany}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.deleteown}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="roleId" header="Role Id" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="userId" header="User Id" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="serviceId" header="Service Id" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="read" header="Read" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="create" header="Create" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="updateany" header="Updateany" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="updateown" header="Updateown" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="deleteany" header="Deleteany" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="deleteown" header="Deleteown" body={pTemplate8} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default ServicePermissionsDataTable;