import { Button, tokens } from '@fluentui/react-components';
import { ArrowSyncRegular, FilterRegular } from '@fluentui/react-icons';
import React from 'react';

const OfferFilter = () => {
    return (
         <div className='flex flex-col gap-3 bg-gray-50 px-5 py-8 border border-slate-200 rounded-md' style={{ backgroundColor: tokens.colorNeutralBackground1 }}>
            <div>
                <FilterRegular /> 
                Filtres
            </div>
            
            <form className='flex flex-wrap gap-4 items-end'>
                <Button appearance="secondary" icon={<ArrowSyncRegular />} size='large'>Réinitialiser</Button>
            </form>
        </div>
    );
}

export default OfferFilter;
