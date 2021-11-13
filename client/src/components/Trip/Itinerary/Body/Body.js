import React from 'react';
import { List } from 'react-movable';
import TableRow from './TableRow/TableRow'

const Body= (propsBody) => {
  return (
    <List 
        values={propsBody.places}

        onChange =  {({ oldIndex, newIndex }) =>
                        propsBody.placeActions.move(oldIndex, newIndex)
                    }

        renderList= {({ children, props }) =>   <tbody styles={{overflow:'none'}}{...props}>
                                                    {children}
                                                </tbody>
                    }
        lockVertically={true}
        renderItem= {({ value, props, isDragged }) =>      <TableRow
                                                    key={`table-${JSON.stringify(value)}-${props.key}`}
                                                    place={value}
                                                    placeActions={props.placeActions}
                                                    itemProps={props}
                                                    index={props.key}
                                                    lockVertically={true}
                                                    {...propsBody}
                                                    isDragged={isDragged}
                                                />
                    }
    />

    

  );
};
export default Body;