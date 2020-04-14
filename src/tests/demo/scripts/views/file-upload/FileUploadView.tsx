import Cascade, { Component } from 'cascade';

import { FileUpload, Section } from '../../../../../scripts/modules/ArtistryCascade';

export interface ITableViewProps {

}

export default class TableView extends Component<ITableViewProps> {
    select = async (files: FileList) => {
        console.log('files:', files);
        return undefined;
    }

    render() {
        return (
            <Section
                header="File Upload"
                headerSpace
                space
            >
                <FileUpload onSelect={this.select} />
            </Section>
        );
    }
}