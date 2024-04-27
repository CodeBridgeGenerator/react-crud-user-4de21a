
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const InvitationsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.accepted}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.sentStatus}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.content}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="email" header="Email" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="accepted" header="Accepted" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="sentStatus" header="Sent Status" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="content" header="Content" body={pTemplate3} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default InvitationsDataTable;