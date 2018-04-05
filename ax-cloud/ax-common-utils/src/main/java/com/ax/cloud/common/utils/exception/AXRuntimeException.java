package com.ax.cloud.common.utils.exception;

/**
 * 框架自定义运行时异常
 * 
 * @author <a href="mailto:2506705328@qq.com">徐静波</a>
 */
public class AXRuntimeException extends RuntimeException {

	private static final long serialVersionUID = 6156137788498588680L;

	/**
	 * 基础错误码
	 */
	private static final String BASE_ERROR_CODE = "999999";
	
	/**
	 * 基础错误信息
	 */
	private static final String BASE_ERROR_MESSAGE = "系统运行错误";
	
	/**
	 * 自定义错误码
	 */
	private String code;

	/**
	 * 自定义错误信息
	 */
	private String message;

	public AXRuntimeException() {
		this(AXRuntimeException.BASE_ERROR_CODE);
	}
	
	public AXRuntimeException(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public AXRuntimeException(String message) {
		this(message, null, false, false);
	}

	public AXRuntimeException(Throwable cause) {
		this(cause == null ? null : cause.toString(), cause);
	}

	public AXRuntimeException(String message, Throwable cause) {
		this(message, cause, false, false);
	}
	
	public AXRuntimeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.code = AXRuntimeException.BASE_ERROR_CODE;
		this.message = AXRuntimeException.BASE_ERROR_MESSAGE;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
