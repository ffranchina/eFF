'use strict'

var eFF = (function() {

	const magic_param = 'data='

	return {
	
		addButton: function(label) {
            label = label || 'PRINT THIS FORM!'
			var container = document.getElementById('eff_container')
			var printButton = document.createElement('input')
		
			printButton.setAttribute('type', 'button')
			printButton.setAttribute('id', 'eff_print')
			printButton.setAttribute('value', label)

            printButton.addEventListener('click', function(ev) {
                window.print()
            })

			container.after(printButton)
		},
		
		getDataFromUrl: function() {
			var query = location.search.substring(1) // excludes the '?'
			var qParts = query.split('&')
			var jsonStr = '{}' // no json

			for ( var i = 0; i < qParts.length; i++ ) {
				// if present, get the desired part of the query
				if ( qParts[i].startsWith(magic_param) ) {
					jsonStr = qParts[i].substring(magic_param.length)
					break
				}
			}

			jsonStr = decodeURI(jsonStr)

			return JSON.parse(jsonStr)
		},
		
		fillForm: function(dataObj) {
			// if present, fills in the form
			if (dataObj) Object.keys(dataObj).forEach(function(key) {
				var input = document.querySelector('[name="' + key + '"]')
		
				if (input) input.value = dataObj[key]
			})
		}
		
	}

})()

window.onload = function() {

	var formDataObj = eFF.getDataFromUrl()

	eFF.addButton()
	
	eFF.fillForm(formDataObj)
    
}
