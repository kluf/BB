app.controller('MainController', function($scope) {
    $scope.understand = 'Scope withing controller';
    $scope.inputValue = "";
    $scope.selectedPerson = 0;
    $scope.selectedGenre = null;
    $scope.people = [
        {
            id: 0,
            name: 'Leon',
            music: [
                'Rock', 'Metal', 'Pop'
            ],
            live: true
        },
        {
            id: 1,
            name: 'Mary',
            music: [
                'Jazz', 'Metal', 'Blues'
            ],
            live: true
        },
        {
            id: 2,
            name: 'John',
            music: [
                'Raegee', 'Jazz', 'Black-metal'
            ],
            live: false
        },
        {
            id: 3,
            name: 'Clara',
            music: [
                'Rock', 'Jazz', 'hardcore'
            ],
            live: true
        },
    ];
    $scope.newPerson = null;
    $scope.addNew = function() {
        if ($scope.newPerson != null && $scope.newPerson != "") {
            $scope.people.push({
                id: $scope.people.length,
                name: $scope.newPerson,
                live: true,
                music: []
            })
        }
    }
});