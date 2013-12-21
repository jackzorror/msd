package com.morningstardance.app.util;

public enum WeekdayEnum {

        SUN(0), MON(1), TUE(2), WED(3), THU(4), FRI(5), SAT(6);
        private final int value;

        private WeekdayEnum(int value) {
            this.value = value;
        }
        public int getValue() {
            return value;
        }
        static public String getWeekdayString(int id) {
    		String result = "";
    		switch (id) {
    			case 0:
    				result = WeekdayEnum.SUN.name();
    				break;
    			case 1:
    				result = WeekdayEnum.MON.name();
    				break;
    			case 2:
    				result = WeekdayEnum.TUE.name();
    				break;
    			case 3:
    				result = WeekdayEnum.WED.name();
    				break;
    			case 4:
    				result = WeekdayEnum.THU.name();
    				break;
    			case 5:
    				result = WeekdayEnum.FRI.name();
    				break;
    			case 6:
    				result = WeekdayEnum.SAT.name();
    		}
    		return result;
        }
        static public WeekdayEnum getWeekdayEnum(int id) {
        	WeekdayEnum result = null;
    		switch (id) {
			case 0:
				result = WeekdayEnum.SUN;
				break;
			case 1:
				result = WeekdayEnum.MON;
				break;
			case 2:
				result = WeekdayEnum.TUE;
				break;
			case 3:
				result = WeekdayEnum.WED;
				break;
			case 4:
				result = WeekdayEnum.THU;
				break;
			case 5:
				result = WeekdayEnum.FRI;
				break;
			case 6:
				result = WeekdayEnum.SAT;
				break;
    		}
        	return result;
        }
}
