
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const FieldMetaDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.fieldId}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.descriptive}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.structural}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.administrative}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.reference}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.statistical}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.legal}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="fieldId" header="Field Id" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="descriptive" header="Descriptive" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="structural" header="Structural" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="administrative" header="Administrative" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="reference" header="Reference" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="statistical" header="Statistical" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="legal" header="Legal" body={pTemplate6} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default FieldMetaDataTable;