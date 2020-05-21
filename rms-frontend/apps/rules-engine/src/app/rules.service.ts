import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor() { }

  buildRulesText(conditions:any[], actions:any[]) {
    let returnRulesText = "ALL_CONDITIONS<br><br><h3><b>Perform these actions</b></h3>ALL_ACTIONS"
    let conditionsString = "";
    let actionsString = "";

    for(let i = 0; i < conditions.length; i++){
      let item = conditions[i];
      let aCondition = this.determineText(item.conditionName.value);
      let aComparator = this.determineText(item.conditionComparator);
      let aValue = item.conditionValue || "";
      if(item.conditionValueHidden != ""){
        aValue = aValue.split(", ").join(" OR ")
      }

      conditionsString = conditionsString + "with " + aCondition + aComparator + aValue;

      if(i != conditions.length - 1) {
        conditionsString = conditionsString + "<br><i>AND</i><br>";
      }
    }

    for(let i = 0; i < actions.length; i++){
      let item = actions[i];
      let aAction = this.determineText(item.actionName);
      let aValue = item.actionValue || "";
      if(item.actionValueHidden != ""){
        aValue = aValue.split(", ").join(" AND ")
      }

      actionsString = actionsString + aAction + "<b>" + aValue + "</b>";

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
      case "notEquals": {
        return "not equal to "
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
