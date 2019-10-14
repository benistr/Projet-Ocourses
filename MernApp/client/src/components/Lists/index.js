import React from 'react';
import initialData from './initial-data';
import Column from './column';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

//Local imports
import './lists.scss';
import './../App/App.css';

import Supprimer from './supprimer.png';
import Image from './oeuf.jpg';

const Contain = styled.div`
    position: absolute; 
    height: 10px;
    left: 0;
    right: 0;
`

const Container = styled.div`
    padding-top: 120px;
    top: 50px;
    left: 0;
    right: 0;
`;


class Lists extends React.Component {
    state = initialData;

    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;    
    
        if(!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId && destination.index === source.index
        ) {
            return;
        }

        if(type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder,
            };
            this.setState(newState);
            return;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,            
            },
        };

        this.setState(newState);
    };

    render() {
        return (

            <Contain className="mainContainer">
            <p className="navigation">▶ Accueil ▶ Mes listes</p>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable 
                    droppableId="all-columns" 
                    direction="vertical" 
                    type="column"
                >
                {provided => (
                    <Container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {this.state.columnOrder.map((columnId, index) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(
                        taskId => this.state.tasks[taskId],
                    );

                    return (
                        <Column 
                            key={column.id} 
                            column={column} 
                            tasks={tasks} 
                            index={index}
                        />
                        );
                    })}
                    {provided.placeholder}
                    </Container>
                )}
                </Droppable>
            </DragDropContext>

            </Contain>
        );
        
    }
}


export default Lists;