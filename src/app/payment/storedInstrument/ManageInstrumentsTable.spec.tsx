import { mount, render } from 'enzyme';
import React from 'react';

import { getStoreConfig } from '../../config/config.mock';
import { createLocaleContext, LocaleContext, LocaleContextType } from '../../locale';
import { LoadingOverlay } from '../../ui/loading';

import { getInstruments } from './instruments.mock';
import ManageInstrumentsTable, { ManageInstrumentsTableProps } from './ManageInstrumentsTable';

describe('ManageInstrumentsTable', () => {
    let defaultProps: ManageInstrumentsTableProps;
    let localeContext: LocaleContextType;

    beforeEach(() => {
        defaultProps = {
            instruments: getInstruments(),
            isDeletingInstrument: false,
            onDeleteInstrument: jest.fn(),
        };

        localeContext = createLocaleContext(getStoreConfig());
    });

    it('matches snapshot with rendered output', () => {
        const component = render(
            <LocaleContext.Provider value={ localeContext }>
                <ManageInstrumentsTable { ...defaultProps } />
            </LocaleContext.Provider>
        );

        expect(component)
            .toMatchSnapshot();
    });

    it('renders instrument as row in table', () => {
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <ManageInstrumentsTable { ...defaultProps } />
            </LocaleContext.Provider>
        );

        expect(component.find('[data-test="manage-instrument-cardType"]').at(0).text())
            .toEqual('Visa');

        expect(component.find('[data-test="manage-instrument-last4"]').at(0).text())
            .toEqual('4321');

        expect(component.find('[data-test="manage-instrument-expiry"]').at(0).text())
            .toEqual('02/2020');
    });

    it('triggers callback when delete button is clicked', () => {
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <ManageInstrumentsTable { ...defaultProps } />
            </LocaleContext.Provider>
        );

        component.find('[data-test="manage-instrument-delete-button"]').at(1)
            .simulate('click');

        expect(defaultProps.onDeleteInstrument)
            .toHaveBeenCalledWith(defaultProps.instruments[1].bigpayToken);
    });

    it('renders message if there are no available instruments', () => {
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <ManageInstrumentsTable
                    { ...defaultProps }
                    instruments={ [] }
                />
            </LocaleContext.Provider>
        );

        expect(component.text())
            .toEqual(localeContext.language.translate('payment.instrument_manage_modal_empty_text'));
    });

    it('shows loading overlay when deleting', () => {
        const component = mount(
            <LocaleContext.Provider value={ localeContext }>
                <ManageInstrumentsTable
                    { ...defaultProps }
                    isDeletingInstrument={ true }
                />
            </LocaleContext.Provider>
        );

        expect(component.find(LoadingOverlay).prop('isLoading'))
            .toEqual(true);
    });
});
