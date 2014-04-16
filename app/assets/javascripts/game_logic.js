
/*var actions = new Array("action1", "2", "3", "4", "5", "6");
        	*/
        	/*
        	 * Reward values are assigned as per follows
        	 * Reward -1 on each step
        	 * Reward +20 on valid drop-off
        	 * Reward -10 on wrong pickup and drop-off
        	 * Change these values for different reward structure
        	 */
        	var reward = 0; //Store current reward
        	var reward_each_step = -1;
        	var reward_correct_dropoff = 20;
        	var reward_wrong_pickup_dropoff = -10;
        	
			var taxi_location = {
				x: 3,
				y: 1
			};
			var passanger_location = {
				x: 0,
				y: 0
			};
			var destination_location = {
				x: 0,
				y: 4
			}
			var wall1 = {
				x: 2,
				y: 0
			}
			var wall2 = {
				x: 2,
				y: 1
			}
			var wall3 = {
				x: 1,
				y: 3
			}
			var wall4 = {
				x: 1,
				y: 4
			}
			var wall5 = {
				x: 3,
				y: 3
			}
			var wall6 = {
				x: 3,
				y: 4
			}
			var walls = [];
			walls.push(wall1);
			walls.push(wall2);
			walls.push(wall3);
			walls.push(wall4);
			walls.push(wall5);
			walls.push(wall6);
			
			// Variable to store actions taken by user in a session
			var steps = [];
			
			/*
			 * Following variables denotes row number of object in the table displayed to user
			 * Modify here if table layout is changed
			 */
			var passenger_row = 3;
			var destination_row = 0;
			var wall_north_row = 4;
			var reward_row = 1;
			
			
			var is_touching_n=false, is_touching_s=false, is_touching_w=false, is_touching_e=false;
			var is_in_taxi=false;
			
        	var actions = {
        		a1: function() { action1(); },
        		a2: function() { action2(); },
        		a3: function() { action3(); },
        		a4: function() { action4(); },
        		a5: function() { action5(); },
        		a6: function() { action6(); }
        	};
        	var i = 0;
			for (a in actions) {
    			actions[i] = actions[a];
    			++i;
			}

			function sendStepsToServer() {
				alert("Sending Data to Server");
				$.ajax({
                	type: "POST",
                    url: "/games/storedata",
                    data: {steps: JSON.stringify(steps)},
                    success: function() { alert("Success!"); }
                });
			}
			
        	function printSummary() {
        		var wall_on_east = {
					x: 4,
					y: taxi_location.y
				};
				var wall_on_west = {
					x: 0,
					y: taxi_location.y
				};
				var wall_on_south = {
					x: taxi_location.x,
					y: 4
				};
				var wall_on_north = {
					x: taxi_location.x,
					y: 0
				};
				
				/*
				 * Print destination location
				 */
				var tab = document.getElementById("summary").rows[destination_row].cells;
				tab[1].innerHTML = "( "+(destination_location.x-taxi_location.x)+", "+(destination_location.y-taxi_location.y)+" )";
				
				/*
				 * Print reward value
				 */
				tab = document.getElementById("summary").rows[reward_row].cells;
				tab[1].innerHTML = reward;
        		/*
        		 * Print passenger location
        		 */
        		tab = document.getElementById("summary").rows[passenger_row].cells;
        		if(is_in_taxi == true)
        			tab[3].innerHTML=2;
        		else
        			tab[3].innerHTML=1;
        			
        		tab[1].innerHTML="( "+(passanger_location.x-taxi_location.x)+", "+(passanger_location.y-taxi_location.y)+" )";
        		
        		/*
        		 * Find walls in 4 direction from taxi agent
        		 */
        		for(w in walls) {
					if(walls[w].x < taxi_location.x && walls[w].y == taxi_location.y) {
						wall_on_west.x = walls[w].x;
						wall_on_west.y = walls[w].y;
					}
					else if(walls[w].x > taxi_location.x && walls[w].y == taxi_location.y) {
						wall_on_east.x = walls[w].x;
						wall_on_east.y = walls[w].y;
					}
					else if(walls[w].y < taxi_location.y && walls[w].x == taxi_location.x) {
						wall_on_north.x = walls[w].x;
						wall_on_north.y = walls[w].y;
					}
					else if(walls[w].y > taxi_location.y && walls[w].x == taxi_location.x) {
						wall_on_south.x = walls[w].x;
						wall_on_south.y = walls[w].y;
					}
				}
				/*
				 * Print wall locations for 4 sides
				 */
				tab = document.getElementById("summary").rows[wall_north_row].cells;
				tab[1].innerHTML="( "+(wall_on_north.x-taxi_location.x)+", "+(wall_on_north.y-taxi_location.y)+" )";
				tab = document.getElementById("summary").rows[wall_north_row+1].cells;
				tab[1].innerHTML="( "+(wall_on_south.x-taxi_location.x)+", "+(wall_on_south.y-taxi_location.y)+" )";
				tab = document.getElementById("summary").rows[wall_north_row+2].cells;
				tab[1].innerHTML="( "+(wall_on_east.x-taxi_location.x)+", "+(wall_on_east.y-taxi_location.y)+" )";
				tab = document.getElementById("summary").rows[wall_north_row+3].cells;
				tab[1].innerHTML="( "+(wall_on_west.x-taxi_location.x)+", "+(wall_on_west.y-taxi_location.y)+" )";
        	}
        	
			function checkMoveAgainstWalls(newX, newY) {
				for(w in walls) {
					if(walls[w].x == newX && walls[w].y == newY) {
						return false;
					}
				}
				return true;
			}
			
        	function action1() { //go west
        		if(taxi_location.x > 0 && checkMoveAgainstWalls(taxi_location.x-1, taxi_location.y)) {
        			taxi_location.x -= 1;
        			is_touching_e = false;
        			if(is_in_taxi == true) {
        				passanger_location.x -= 1;
        			}
        		}
        		if(taxi_location.x == 0) {
        			is_touching_w = true;
        		}
        		else {
        			is_touching_w = false;
        		}
        		alert("Action: Go West");
        		steps.push("go_west");
        		reward += reward_each_step;
        		printSummary();
        	}
        	
            function action2() { //go east
        		if(taxi_location.x < 4 && checkMoveAgainstWalls(taxi_location.x+1, taxi_location.y)) {
        			taxi_location.x += 1;
        			is_touching_w = false;
        			if(is_in_taxi == true) {
        				passanger_location.x += 1;
        			}
        		}
        		if(taxi_location.x == 4) {
        			is_touching_e = true;
        		}
        		else {
        			is_touching_e = false;
        		}
        		alert("Action: Go East");
        		steps.push("go_east");
        		reward += reward_each_step;
        		printSummary();
        	}
        	
        	function action3() { //go north
        		if(taxi_location.y > 0 && checkMoveAgainstWalls(taxi_location.x, taxi_location.y-1)) {
        			taxi_location.y -= 1;
        			is_touching_s = false;
        			if(is_in_taxi == true) {
        				passanger_location.y -= 1;
        			}
        		}
        		if(taxi_location.y == 0) {
        			is_touching_n = true;
        		}
        		else {
        			is_touching_n = false;
        		}
        		alert("Action: Go North");
        		steps.push("go_north");
        		reward += reward_each_step;
        		printSummary();
        	} 
        	function action4() { //go south
        		alert("Action: Go South");
        		if(taxi_location.y < 4 && checkMoveAgainstWalls(taxi_location.x, taxi_location.y+1)) {
        			taxi_location.y += 1;
        			is_touching_n = false;
        			if(is_in_taxi == true) {
        				passanger_location.y += 1;
        			}
        		}
        		if(taxi_location.y == 4) {
        			is_touching_s = true;
        		}
        		else {
        			is_touching_s = false;
        		}
        		steps.push("go_south");
        		reward += reward_each_step;
        		printSummary();
        	} 
        	
        	function action5() { // pickup
        		alert("Action: Pickup");
        		if(taxi_location.x == passanger_location.x && taxi_location.y == passanger_location.y) {
        			reward += reward_each_step;
        			is_in_taxi=true;
        		}
        		else {
        			reward += reward_wrong_pickup_dropoff;
        		}
        		
        		steps.push("pickup");
        		printSummary();
        	} 
        	function action6() { //drop off
        		alert("Action: Drop-off");
        		steps.push("drop-off");

        		if(destination_location.x == taxi_location.x && destination_location.y == taxi_location.y) {
        			if(is_in_taxi == true) {
        				reward += reward_correct_dropoff;
        				is_in_taxi = false;
        				sendStepsToServer();
        				alert("- SUCCESS -");
        				location.reload();
        			}
        			else {
        				reward += reward_wrong_pickup_dropoff;
        			}
        		}
        		else {
        			reward += reward_wrong_pickup_dropoff;
        		}
        		
        		printSummary();
        	}
        	
        	function shuffle() {
				/*var counter = array.length, temp, index;    
				while (counter > 0) {
		        	index = Math.floor(Math.random() * counter);
					counter--;
        			temp = array[counter];
        			array[counter] = array[index];
        			array[index] = temp;
   			 	}
				return array;*/
				var actiona1 = {};
				var check = [0, 0, 0, 0, 0, 0, 0];
				var counter=6;
				var index, max=0, k=0;
				for(a in actions) {
					index = Math.floor(Math.random() * counter+1 );
					while(check[index-1] != 0 && max < 6) {
						index = Math.floor(Math.random() * counter+1);
					}
					if(max == 6)
						return;
					check[index-1] = 1;
					actions1[k++] = actions[index-1];
					max++;
				}
				var i=0;
				while(i < 6) {
					actions[i] = actions1[i++];
				}
			}

        
