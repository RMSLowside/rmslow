import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor() { }

  buildRulesText(conditions:any[], actions:any[]) {
    let returnRulesText = "ALL_CONDITIONS<br><br>Perform these actions<br><br>ALL_ACTIONS"
    let conditionsString = "";
    let actionsString = "";

    for(let i = 0; i < conditions.length; i++){
      let item = conditions[i];
      let aCondition = this.determineText(item.conditionName.value);
      let aComparator = this.determineText(item.conditionComparator);
      let aValue = item.value || ""

      conditionsString = conditionsString + "with " + aCondition + aComparator + item.conditionValue;

      if(i != conditions.length - 1) {
        conditionsString = conditionsString + "<br><i>AND</i><br>";
      }
    }

    for(let i = 0; i < actions.length; i++){
      let item = actions[i];
      let aAction = this.determineText(item.action);

      actionsString = actionsString + aAction + "<b>" + item.value + "</b>";

      if(i != actions.length - 1) {
        actionsString = actionsString + "<br><i>AND</i><br>";
      }
    }

    return returnRulesText.replace("ALL_CONDITIONS", conditionsString).replace("ALL_ACTIONS", actionsString);
  }

  determineText(text:string) {
    switch(text) {
      case "equals": {
        return "equal to "
      }
      case "contains": {
        return "containing "
      }
      case "notContains": {
        return "not containing "
      }
      case "greaterThan": {
        return "greater than "
      }
      case "lessThan": {
        return "less than "
      }
      case "createDate": {
        return "a <b>create date</b> "
      }
      case "producer": {
        return "a <b>producer</b> "
      }
      case "title": {
        return "the <b>title</b> "
      }
      case "textContent": {
        return "the <b>text content</b> "
      }
      case "rmm": {
        return "Add document to RMM with value "
      }
      case "message": {
        return "Then a message to "
      }
      case "transfer": {
        return "Transfer to "
      }
      case "drop": {
        return "Do nothing"
      }
      default: {
        return "";
      }
    }
  }
}
