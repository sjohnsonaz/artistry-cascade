import Cascade, { Component } from 'cascade';

export interface ISearchProps {

}

export default class Search extends Component<ISearchProps> {
    render() {
        return (
            <div class="search">
                <div class="button-group search-button-group">
                    <input class="input search-input fill-width" />
                    <button class="button search-button">Search</button>
                </div>
                <div class="search-option-box">
                    <ul role="listbox" class="search-option-list">
                        <li class="search-option" role="presentation" tabindex="0">
                            <div class="search-option-action" role="option">
                                <div class="search-option-action-text">
                                    <span><b>Search Option</b></span>
                                </div>
                            </div>
                            <div class="search-option-alt-action">
                                <div class="search-option-alt-action-text">Alt Action</div>
                            </div>
                        </li>
                        <li class="search-option" role="presentation" tabindex="0">
                            <div class="search-option-action" role="option">
                                <div class="search-option-action-text">
                                    <span><b>Search Option</b></span>
                                </div>
                            </div>
                            <div class="search-option-alt-action">
                                <div class="search-option-alt-action-text">Alt Action</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}