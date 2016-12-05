import Cascade, {Component} from 'cascade';

export interface IModalProps {
    open: boolean;
    onclose: (event: Event) => void;
}

export default class Modal extends Component<IModalProps> {

    preventClick(event: Event) {
        event.stopPropagation();
    }

    close = (event) => {
        this.props.onclose(event);
    }

    render() {
        let {open} = this.props;
        var className = 'modal' + (open ? ' modal-open' : '');
        return (
            <div className={className} onclick={this.close}>
                <div className="modal-content" onclick={this.preventClick}>
                    {this.children}
                </div>
            </div>
        );
    }
}
