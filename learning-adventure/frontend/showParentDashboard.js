export function showParentDashboard() {
    const dashboardContent = `
        <h2>Parent Dashboard</h2>
        <p>Welcome to the Parent Dashboard. Here you can monitor your child's progress and activities.</p>
        <ul>
            <li>Child's Name: John Doe</li>
            <li>Current Level: 5</li>
            <li>Recent Activities: 
                <ul>
                    <li>Completed Math Quiz</li>
                    <li>Read Chapter 3 of Science Book</li>
                </ul>
            </li>
            <li>Progress: 75%</li>
        </ul>
    `;
    document.querySelector('#app').innerHTML = dashboardContent;
}
