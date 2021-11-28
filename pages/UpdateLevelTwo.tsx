import React from 'react'

export const UpdateLevelTwo= (props: { history: string[]; title: string; state: string; }) => {
    
    return (
        <div className="text-center col-6 mx-auto">
             <h3>Edit Deliverables !!</h3><br />
        </div>
    )
}

export default UpdateLevelTwo;
UpdateLevelTwo.defaultProps = {
	title: "Skill Base",
	searchBar: true
}