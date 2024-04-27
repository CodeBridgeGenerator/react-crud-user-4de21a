
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const CompaniesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.companyName}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.companyNo}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.brandName}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.website}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.addressId}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.logourl}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.companyEmail}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.phoneTypeId}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.faxTypeId}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.isDefault}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="companyName" header="Company Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="companyNo" header="Company No" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="brandName" header="Brand Name" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="website" header="Website" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="addressId" header="Address Id" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="logourl" header="Logourl" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="companyEmail" header="Company Email" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="phoneTypeId" header="Phone Type Id" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="faxTypeId" header="Fax Type Id" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="isDefault" header="Is Default" body={pTemplate9} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default CompaniesDataTable;