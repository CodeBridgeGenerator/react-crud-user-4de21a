
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const RefPositionsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.roleId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.position}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.abbr}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.reportingtoidPositionHierarchyId}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.departmentId}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.direct}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.ishead}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="roleId" header="Role Id" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="position" header="Position" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="abbr" header="Abbr" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="reportingtoidPositionHierarchyId" header="Reportingtoid Position Hierarchy Id " body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="departmentId" header="Department Id" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="direct" header="Direct" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="ishead" header="Ishead" body={pTemplate6} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default RefPositionsDataTable;