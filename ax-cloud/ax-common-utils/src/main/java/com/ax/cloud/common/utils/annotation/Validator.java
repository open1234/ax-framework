package com.ax.cloud.common.utils.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 实体Bean参数校验类
 * 
 * @author <a href="mailto:2506705328@qq.com">徐静波</a>
 */
@Documented
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Validator {

	/**
	 * 空值校验
	 * 
	 * @return
	 */
	public boolean required() default false;

	/**
	 * 正则表达式校验，适用字符串
	 * 
	 * @return
	 */
	public String regex() default "";

	/**
	 * 长度校验，适用字符串
	 * 
	 * @return
	 */
	public long length() default -1;

	/**
	 * 最大长度校验，适用字符串
	 * 
	 * @return
	 */
	public long maxLength() default Long.MAX_VALUE;

	/**
	 * 最小长度校验，适用字符串
	 * 
	 * @return
	 */
	public long minLength() default Long.MIN_VALUE;

	/**
	 * 空字符串校验，适用字符串
	 * 
	 * @return
	 */
	public boolean isBlank() default true;

	/**
	 * 是否为int类型校验
	 * 
	 * @return
	 */
	public boolean isInt() default false;

	/**
	 * 最大值校验，适用short、int、long类型
	 * 
	 * @return
	 */
	public long max() default Long.MAX_VALUE;

	/**
	 * 最小值校验，适用short、int、long类型
	 * 
	 * @return
	 */
	public long min() default Long.MIN_VALUE;

	/**
	 * 枚举校验
	 * 
	 * @return
	 */
	public long[] in() default {};
}
