import Cascade, { Component, observable, Ref } from 'cascade';

export interface IFileUploadProps {
    id?: string;
    className?: string;
    onSelect: (files: FileList) => Promise<any>;
    value?: string;
    text?: string;
}

export default class FileUpload extends Component<IFileUploadProps> {
    @observable dragging?: boolean = false;
    @observable uploading?: boolean = false;
    fileInput: Ref<HTMLInputElement> = new Ref();

    handleFiles = async (files: FileList) => {
        this.uploading = true;
        await this.props.onSelect(files);
        this.uploading = false;
    }

    click = () => {
        this.fileInput.current.click();
    }

    select = () => {
        let fileInput = this.fileInput.current;
        let files = fileInput.files;
        if (files && files.length) {
            this.handleFiles(files);
        }
    }

    drop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragLeave(event);
        let files = event.dataTransfer.files;
        if (files && files.length) {
            this.handleFiles(files);
        }
    }

    dragEnter = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragging = true;
    }

    dragLeave = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragging = false;
    }

    render() {
        let {
            id,
            className,
            text,
            value
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('file-upload');

        return (
            <div
                id={id}
                className={classNames.join(' ')}
                ondragover={this.dragEnter}
                ondragenter={this.dragEnter}
                ondragleave={this.dragLeave}
                ondragend={this.dragLeave}
                ondrop={this.drop}
                onclick={this.click}
                data-dragging={this.dragging}
                data-uploading={this.uploading}
            >
                <input
                    type="file"
                    onchange={this.select}
                    value={value}
                    multiple
                    ref={this.fileInput}
                />
                {text || 'Click or Drag and Drop to upload'}
            </div>
        );
    }
}